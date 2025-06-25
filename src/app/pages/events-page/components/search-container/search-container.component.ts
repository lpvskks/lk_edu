import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CalendarComponentComponent } from '../calendar-component/calendar-component.component';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from '../event-card/event-card.component';

export interface EventsFilter {
  name: string;
  date: Date | null;
}

@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    CalendarComponentComponent,
    CommonModule
  ],
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss'],
})
export class SearchContainerComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: [''],
    date: [null as Date | null],
  });

  showCalendar = false;
  private previousDate: Date | null = null;

  @Output() search = new EventEmitter<EventsFilter>();

  openCalendar() {
    this.previousDate = this.form.get('date')!.value;
    this.showCalendar = true;
  }

  onDatePicked(date: Date) {
    this.form.get('date')!.setValue(date);
    this.showCalendar = false;
  }

  onCancel() {
    this.form.get('date')!.setValue(this.previousDate);
    this.showCalendar = false;
  }

  submit() {
    const name = this.form.get('name')!.value ?? '';
    const date = this.form.get('date')!.value ?? null;

    this.search.emit({ name, date });
  }
}
