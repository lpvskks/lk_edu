import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type PopupType = 'info' | 'success' | 'warning' | 'error';
@Component({
  selector: 'app-popup',
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent {
  @Input() type: PopupType = 'success';
  @Input() message = '';
  @Output() close = new EventEmitter<void>();

  readonly titleMap: Record<PopupType, string> = {
    info: 'Информация',
    success: 'Успех',
    warning: 'Предупреждение',
    error: 'Ошибка',
  };

  get title(): string {
    return this.titleMap[this.type];
  }
  onCloseClick() {
    this.close.emit();
  }
}
