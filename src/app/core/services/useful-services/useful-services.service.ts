import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, shareReplay } from 'rxjs';
import { UserType } from '../../../shared/types/profile/profile';
import { MetaData, PagedResourcesResponse } from '../../../shared/types/useful-services.ts/useful-services';
import { API_URL } from '../../constants/api-url';

@Injectable({ providedIn: 'root' })
export class UsefulServicesService {
  private http = inject(HttpClient);
  private cache = new Map<string, Observable<PagedResourcesResponse>>();

  getUsefulServicesByUserTypes(
    userTypes: UserType[],
    page: number,
    pageSize: number
  ): Observable<PagedResourcesResponse> {
    const categories = this.mapUserTypesToCategories(userTypes);
    if (!categories.length) {
      return of({ results: [], metaData: this.emptyMetaData() });
    }

    const key = `${categories.sort().join(',')}|${page}|${pageSize}`;
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    categories.forEach(c => params = params.append('categories', c));

    const req$ = this.http
      .get<PagedResourcesResponse>(`${API_URL}/UsefulServices`, { params })
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));

    this.cache.set(key, req$);
    return req$;
  }
    getFileUrl(fileId: string): string {
    return `${API_URL}/Files/${fileId}`;
  }
  
  private mapUserTypesToCategories(userTypes: UserType[]): string[] {
    const isStu  = userTypes.includes('Student');
    const isEmp  = userTypes.includes('Employee');
    const isAdm  = userTypes.includes('Admin');

    if (isAdm || (isStu && isEmp)) {
      return ['Students', 'Employees'];
    } else if (isStu) {
      return ['Students'];
    } else if (isEmp) {
      return ['Employees'];
    }
    return [];
  }

  private emptyMetaData(): MetaData {
    return {
      pageCount: 0,
      totalItemCount: 0,
      pageNumber: 0,
      pageSize: 0,
      hasPreviousPage: false,
      hasNextPage: false,
      isFirstPage: true,
      isLastPage: true,
      firstItemOnPage: 0,
      lastItemOnPage: 0
    };
  }
}
