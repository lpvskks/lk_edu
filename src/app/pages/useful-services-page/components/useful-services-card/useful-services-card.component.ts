import { Component, inject, Input } from '@angular/core';
import { ResourceItem } from '../../../../shared/types/useful-services.ts/useful-services';
import { CommonModule } from '@angular/common';
import { UsefulServicesService } from '../../../../core/services/useful-services/useful-services.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-useful-services-card',
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './useful-services-card.component.html',
  styleUrl: './useful-services-card.component.scss'
})
export class UsefulServicesCardComponent {
  private usefulServicesService = inject(UsefulServicesService);

  @Input() service!: ResourceItem;
  get logoUrl(): string | null {
    return this.service.logo
      ? this.usefulServicesService.getFileUrl(this.service.logo.id)
      : null;
  }

  onNavigate() {
    window.open(this.service.link, '_blank', 'noopener');
  }
}
