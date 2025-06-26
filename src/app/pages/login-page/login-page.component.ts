import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { AuthUser } from '../../shared/types/auth/authUser';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { AuthService } from '../../core/services/auth/auth.service';
import { PopupComponent } from "../../shared/components/popup/popup.component";
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/popup/notification.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSlideToggleModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    HeaderComponent,
    CommonModule
],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private translate = inject(TranslateService);
  router = inject(Router);
  private notifyService  = inject(NotificationService); 

  isLoading = false;

  ngOnInit() {
    this.translate.setDefaultLang('ru');
  }

  form = this.fb.group({ 
    email: ['', Validators.compose([Validators.required, Validators.email])], 
    password: ['', Validators.required],
    rememberMe: [false]
  });
  
  onSubmit() {
     if (this.form.invalid) {
      this.notifyService.notify('warning', 'Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (this.form.valid) {
      this.isLoading = true;
      this.authService.login(this.form.value as AuthUser).pipe(take(1)).
      subscribe({ 
        next: (response) => {
          this.isLoading = false;
          if (response.loginSucceeded) {
              this.notifyService.notify('success', 'Вы успешно вошли в систему');
          setTimeout(() => this.router.navigate(['']), 500);
          } else {
              this.notifyService.notify('error', 'Неверный логин или пароль');
          }
        },
        error: (error) => {
           this.isLoading = false;
        this.notifyService.notify('error', 'Ошибка соединения. Попробуйте ещё раз');
        }
      });
    }
  }
}
