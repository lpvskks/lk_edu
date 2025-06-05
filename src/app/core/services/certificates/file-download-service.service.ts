import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../constants/api-url';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadServiceService {
  private http = inject(HttpClient);

  downloadFile(fileId: string, fileName: string, extension: string): void {
    const downloadUrl = `${API_URL}/Files/${fileId}`;
    this.http.get(downloadUrl, { responseType: 'blob' }).subscribe({
      next: (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${fileName}.${extension.toLowerCase()}`;
        link.click();
        URL.revokeObjectURL(url);
      },
      error: err => {
        console.error('Ошибка при скачивании файла:', err);
      }
    });
  }
}
