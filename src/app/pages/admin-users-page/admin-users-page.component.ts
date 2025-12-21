import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { AlphabetComponent } from './components/alphabet/alphabet.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { UserListService } from '../../core/services/administration/user-list.service';
import { BehaviorSubject, Observable, switchMap, tap, shareReplay } from 'rxjs';
import { UserListResponse } from '../../shared/types/administration/user-list';
import { ParticipantItemComponent } from './components/participant-item/participant-item.component';
import { BreadCrumbComponent } from "../../shared/components/bread-crumb/bread-crumb.component";

@Component({
  selector: 'app-admin-users-page',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    AlphabetComponent,
    PaginationComponent,
    ParticipantItemComponent,
    BreadCrumbComponent
],
  templateUrl: './admin-users-page.component.html',
  styleUrl: './admin-users-page.component.scss'
})
export class AdminUsersPageComponent {
   private layout = inject(LayoutComponent);
   private userListService = inject(UserListService);

  constructor() {
    this.layout.setPageTitle('PAGE_TITLES.ADMINISTRATION');
  }

   private page$ = new BehaviorSubject<number>(1);
  private nameFilter$ = new BehaviorSubject<string | undefined>(undefined);
  private lastNameFilter$ = new BehaviorSubject<string | undefined>(undefined);
  private emailFilter$ = new BehaviorSubject<string | undefined>(undefined);

  private readonly pageSize = 9;
  
   viewMode: 'list' | 'card' = 'list';

  setView(mode: 'list' | 'card') {
    this.viewMode = mode;
  }

  users$: Observable<UserListResponse> = this.page$
    .pipe(
      switchMap(page =>
        this.userListService.getUserList(
          page,
          this.pageSize,
          this.nameFilter$.value,
          this.lastNameFilter$.value
        )
      ),
      tap(res => {
        this.currentPage = res.metaData.pageNumber;
        this.totalPages = res.metaData.pageCount;
      }),
      // используем shareReplay чтобы не делать лишние запросы
      shareReplay({ bufferSize: 1, refCount: true })
    );

  currentPage = 1;
  totalPages = 1;

  onPageChange(page: number) {
    this.page$.next(page);
  }
  onNameChange(name: string) {
    this.nameFilter$.next(name || undefined);
    this.page$.next(1);
  }

  onLastNameFilter(letter: string) {
    this.lastNameFilter$.next(letter || undefined);
    this.page$.next(1);
  }

  onFilterChange(filters: { name?: string; lastName?: string; email?: string }) {
    this.nameFilter$.next(filters.name);
    this.lastNameFilter$.next(filters.lastName);
    this.emailFilter$.next(filters.email);
    this.page$.next(1);
  }
}

