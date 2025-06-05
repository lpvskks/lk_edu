import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  SelectOption,
  OrderInfo,
} from '../../../../shared/types/certificates/certificates';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-certificates',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './order-certificates.component.html',
  styleUrl: './order-certificates.component.scss',
})
export class OrderCertificatesComponent {
  @Input() types: SelectOption[] = [];
  @Input() kinds: SelectOption[] = [];
  @Input() hasBothRoles: boolean = true;
  selectedType!: string;
  selectedKind!: string;

  @Output() order = new EventEmitter<OrderInfo>();

  onOrderClick(): void {
    const payload: OrderInfo = {
      type: this.selectedType || null,
      receiveType: this.selectedKind as 'Electronic' | 'Paper',
    };
    this.order.emit(payload);
    this.selectedType = '';
    this.selectedKind = '';
  }
}
