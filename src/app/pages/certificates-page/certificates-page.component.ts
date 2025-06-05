import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { ProfileService } from '../../core/services/profile/profile.service';
import {
  CertificateCreateDto,
  CertificatesService,
} from '../../core/services/certificates/certificates.service';
import { EducationRecord } from '../../shared/types/profile/education';
import { WorkRecord } from '../../shared/types/profile/work-info';
import {
  CertificateRecord,
  OrderInfo,
} from '../../shared/types/certificates/certificates';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  RoleSelectorComponent,
  RoleType,
} from './components/role-selector/role-selector.component';
import { InfoSectionsComponent } from './components/info-sections/info-sections.component';
import { FileDownloadServiceService } from '../../core/services/certificates/file-download-service.service';
import { OrderCertificatesComponent } from './components/order-certificates/order-certificates.component';
import { CertificateListComponent } from './components/certificate-list/certificate-list.component';
import {
  TYPES_FOR_EDUCATION,
  TYPES_FOR_WORK,
  CERTIFICATE_KINDS,
} from '../../core/constants/certificate-types';

@Component({
  selector: 'app-certificates-page',
  standalone: true,
  imports: [
    CommonModule,
    RoleSelectorComponent,
    InfoSectionsComponent,
    OrderCertificatesComponent,
    CertificateListComponent,
  ],
  templateUrl: './certificates-page.component.html',
  styleUrls: ['./certificates-page.component.scss'],
})
export class CertificatesPageComponent implements OnInit {
  private layout = inject(LayoutComponent);
  private profileService = inject(ProfileService);
  private certService = inject(CertificatesService);
  private fileDownloadService = inject(FileDownloadServiceService);

  hasBothRoles: boolean = false;

  selectedRole: RoleType = 'student';

  selectedIndex: number = 0;

  educationRecord$!: Observable<EducationRecord>;
  workRecord$!: Observable<WorkRecord>;
  certificates$!: Observable<CertificateRecord[]>;
  certificatesList: CertificateRecord[] = [];
  typesForDropdown = TYPES_FOR_EDUCATION;
  kindsForDropdown = CERTIFICATE_KINDS;

  ngOnInit(): void {
    this.layout.setPageTitle('PAGE_TITLES.CERTIFICATES');
    this.profileService.getProfile().subscribe({
      next: (profile) => {
        const types = profile.userTypes;
        const isStudent = types.includes('Student');
        const isEmployee = types.includes('Employee');

        if (isStudent && isEmployee) {
          this.hasBothRoles = true;
          this.selectedRole = 'student';
        } else if (isStudent) {
          this.selectedRole = 'student';
        } else if (isEmployee) {
          this.selectedRole = 'employee';
        }
        this.initStreamsAndLoad();
      },
    });
  }

  onRoleChange(newRole: RoleType): void {
    this.selectedRole = newRole;
    this.selectedIndex = 0;
    this.initStreamsAndLoad();
  }
  onSectionIndexChange(newIndex: number): void {
    if (newIndex !== this.selectedIndex) {
      this.selectedIndex = newIndex;
      this.loadCertificates();
    }
  }

  private initStreamsAndLoad(): void {
    this.educationRecord$ = this.profileService.getUserEducation();
    this.workRecord$ = this.profileService.getUserWork();

    this.typesForDropdown =
      this.selectedRole === 'student' ? TYPES_FOR_EDUCATION : TYPES_FOR_WORK;

    this.loadCertificates();
  }

  private loadCertificates(): void {
    const ownerId$ =
      this.selectedRole === 'student'
        ? this.educationRecord$.pipe(
            map((rec) => rec.educationEntries[this.selectedIndex]?.id ?? '')
          )
        : this.workRecord$.pipe(
            map((rec) => rec.posts[this.selectedIndex]?.id ?? '')
          );

    ownerId$
      .pipe(
        switchMap((ownerId) =>
          ownerId
            ? this.certService.getCertificates(
                this.selectedRole === 'student' ? 'Student' : 'Employee',
                ownerId
              )
            : of([])
        )
      )
      .subscribe({
        next: (fetchedList) => {
          this.certificatesList = fetchedList;
        },
        error: (err) => {
          console.error('Ошибка при получении списка справок:', err);
        },
      });
  }

  onOrder({ type, receiveType }: OrderInfo): void {
    const baseDto: CertificateCreateDto = {
      type: null,
      staffType: null,
      userType: this.selectedRole === 'student' ? 'Student' : 'Employee',
      educationEntryId: null,
      employeePostId: null,
      receiveType: receiveType || 'Electronic',
    };

    if (this.selectedRole === 'student') {
      this.educationRecord$
        .pipe(map((rec) => rec.educationEntries[this.selectedIndex]?.id ?? ''))
        .subscribe({
          next: (entryId) => {
            const dto: CertificateCreateDto = {
              ...baseDto,
              type,
              educationEntryId: entryId,
            };
            this.sendCreateRequest(dto);
          },
          error: (err) => {
            console.error('Ошибка при получении educationEntryId:', err);
          },
        });
    } else {
      this.workRecord$
        .pipe(map((rec) => rec.posts[this.selectedIndex]?.id ?? ''))
        .subscribe({
          next: (postId) => {
            const dto: CertificateCreateDto = {
              ...baseDto,
              staffType: type,
              employeePostId: postId,
            };
            this.sendCreateRequest(dto);
          },
          error: (err) => {
            console.error('Ошибка при получении postId:', err);
          },
        });
    }
  }

  private sendCreateRequest(dto: CertificateCreateDto): void {
    this.certService.createCertificate(dto).subscribe({
      next: (created) => {
        this.certificatesList = [...this.certificatesList, created];
        this.loadCertificates();
      },
      error: (err) => {
        console.error('Ошибка при создании справки:', err);
      },
    });
  }

  onDownloadSignature(cert: CertificateRecord): void {
    if (!cert.signatureFile) {
      console.warn('Нет signatureFile для данной справки');
      return;
    }
    const { id, name, extension } = cert.signatureFile;
    this.fileDownloadService.downloadFile(id, name, extension);
  }

  onDownloadCertificate(cert: CertificateRecord): void {
    if (!cert.certificateFile) {
      console.warn('Нет certificateFile для данной справки');
      return;
    }
    const { id, name, extension } = cert.certificateFile;
    this.fileDownloadService.downloadFile(id, name, extension);
  }
}
