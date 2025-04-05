import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent {
  languages = [
    { code: 'en', label: 'English', flag: 'gb' },
    { code: 'ru', label: 'Русский', flag: 'ru' }
  ];
  

  selectedLang = this.languages[0];
  dropdownOpen = false;

  constructor(private translate: TranslateService) {
    const saved = localStorage.getItem('lang');
    const current = saved || this.translate.getDefaultLang();
    this.selectLanguage(current);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectLanguage(code: string) {
    const lang = this.languages.find(l => l.code === code);
    if (lang) {
      this.selectedLang = lang;
      this.translate.use(code);
      localStorage.setItem('lang', code);
      this.dropdownOpen = false;
    }
  }
}
