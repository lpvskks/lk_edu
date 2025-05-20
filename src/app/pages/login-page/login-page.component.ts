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

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSlideToggleModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    HeaderComponent
],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private translate = inject(TranslateService);
  router = inject(Router);

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
    if (this.form.valid) {
      this.isLoading = true;
      this.authService.login(this.form.value as AuthUser).pipe(take(1)).
      subscribe({ 
        next: (response) => {
          if (response.loginSucceeded) {
            console.log('Токен:', response.accessToken);
            this.router.navigate(['']);
          } else {
            this.isLoading = false;
            alert('Неверный логин или пароль');
          }
        },
        error: (error) => {
          console.error('Ошибка авторизации:', error),
          this.isLoading = false;
        }
      });
    }
  }
}
