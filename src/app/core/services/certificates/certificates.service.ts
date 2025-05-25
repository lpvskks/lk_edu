import { inject, Injectable } from '@angular/core';
import { CertificateRecord } from '../../../shared/types/certificates/certificates';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../constants/api-url';

export interface CertificateCreateDto {
  type: string | null;                  
  staffType: string | null;             
  userType: 'Student' | 'Employee';
  educationEntryId: string | null;      
  employeePostId: string | null;       
  receiveType: 'Electronic' | 'Paper';
}

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
   private http = inject(HttpClient);
getCertificates(
    userType: 'Student' | 'Employee',
    ownerId: string
  ): Observable<CertificateRecord[]> {
    const url = `${API_URL}/Certificates/userType/${userType}/entity/${ownerId}`;
    return this.http.get<CertificateRecord[]>(url);
  }

   createCertificate(dto: CertificateCreateDto): Observable<CertificateRecord> {
    const url = `${API_URL}/Certificates`;
    return this.http.post<CertificateRecord>(url, dto);
  }
}
