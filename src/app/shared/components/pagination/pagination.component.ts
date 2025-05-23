import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MetaData } from '../../types/useful-services.ts/useful-services';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {  @Input() metaData!: MetaData;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return this.metaData?.pageCount ?? 1;
  }

  get currentPage(): number {
    return this.metaData?.pageNumber ?? 1;
  }

  prev() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  next() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  get pages(): (number | '...')[] {
    const total = this.totalPages;
    const cur   = this.currentPage;
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (cur <= 4) {
      return [1,2,3,4,5,'...',total];
    }
    if (cur > total - 4) {
      return [1,'...', total-4, total-3, total-2, total-1, total];
    }
    return [1, '...', cur-1, cur, cur+1, '...', total];
  }

  onClick(page: number | '...') {
    if (page === '...') {
      const arr = this.pages;
      const idx = arr.indexOf('...');
      let target: number;
      if (idx === 1) {
        target = (arr[2] as number) - 1;
      } else {
        target = (arr[idx - 1] as number) + 1;
      }
      this.pageChange.emit(target);
    } else {
      this.pageChange.emit(page);
    }
  }
}
