import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Participant } from '../../../../shared/types/administration/user';

@Component({
  selector: 'app-participant-item',
  imports: [
    CommonModule
  ],
  templateUrl: './participant-item.component.html',
  styleUrl: './participant-item.component.scss'
})
export class ParticipantItemComponent {
  @Input() user!: Participant;
}
