import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CertificateRecord } from '../../../../shared/types/certificates/certificates';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificate-list',
  imports: [CommonModule],
  templateUrl: './certificate-list.component.html',
  styleUrl: './certificate-list.component.scss',
})
export class CertificateListComponent {
  @Input() certificates: CertificateRecord[] = [];
  @Output() downloadSignature = new EventEmitter<CertificateRecord>();
  @Output() downloadCertificate = new EventEmitter<CertificateRecord>();

  onDownloadSignature(cert: CertificateRecord): void {
    this.downloadSignature.emit(cert);
  }

  onDownloadCertificate(cert: CertificateRecord): void {
    this.downloadCertificate.emit(cert);
  }
}
