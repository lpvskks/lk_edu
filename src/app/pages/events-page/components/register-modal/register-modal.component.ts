import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RegistrationData } from '../../../../shared/types/events/event-details';
import { NotificationService } from '../../../../core/services/popup/notification.service';

@Component({
  selector: 'app-register-modal',
  imports: [ReactiveFormsModule, MatInputModule, CommonModule],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.scss',
})
export class RegisterModalComponent {
  private fb = inject(FormBuilder);
  @Output() saved = new EventEmitter<RegistrationData>();
  @Output() canceled = new EventEmitter<void>();
   private notify = inject(NotificationService);

  form = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    additionalInfo: [''],
  });

  submit() {
    if (this.form.valid) {
      this.saved.emit(this.form.value as RegistrationData);
    } else {
       this.form.markAllAsTouched();
      this.notify.notify('warning', 'Пожалуйста, заполните все обязательные поля корректно');
    }
  }

  close() {
    this.canceled.emit();
  }
}
