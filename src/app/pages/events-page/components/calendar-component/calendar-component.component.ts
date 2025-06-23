import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

interface DayCell {
  date: Date;
  inMonth: boolean;
}

@Component({
  selector: 'app-calendar-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-component.component.html',
  styleUrls: ['./calendar-component.component.scss'],
})
export class CalendarComponentComponent {
  @Output() dateSelected = new EventEmitter<Date>();
  @Output() cancelled = new EventEmitter<void>();

  monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  weekDayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  viewDate: Date = new Date();
  selectedDate: Date | null = null;
  calendar: DayCell[] = [];

  ngOnInit() {
    this.buildCalendar();
  }

  private buildCalendar() {
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month + 1, 0);

    let startDow = (firstOfMonth.getDay() + 6) % 7;
    const prevMonthDays = new Date(year, month, 0).getDate();

    const cells: DayCell[] = [];
    for (let i = startDow - 1; i >= 0; i--) {
      cells.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        inMonth: false,
      });
    }

    for (let d = 1; d <= lastOfMonth.getDate(); d++) {
      cells.push({ date: new Date(year, month, d), inMonth: true });
    }

    while (cells.length < 42) {
      const nextDay = cells.length - (startDow + lastOfMonth.getDate()) + 1;
      cells.push({ date: new Date(year, month + 1, nextDay), inMonth: false });
    }

    this.calendar = cells;
  }

  changeMonth(offset: number) {
    this.viewDate = new Date(
      this.viewDate.getFullYear(),
      this.viewDate.getMonth() + offset,
      1
    );
    this.buildCalendar();
  }

  changeYear(offset: number) {
    this.viewDate = new Date(
      this.viewDate.getFullYear() + offset,
      this.viewDate.getMonth(),
      1
    );
    this.buildCalendar();
  }

  selectDay(cell: DayCell) {
    if (!cell.inMonth) return;
    this.selectedDate = cell.date;
  }

  isSelected(cell: DayCell): boolean {
    return (
      !!this.selectedDate &&
      this.selectedDate.getFullYear() === cell.date.getFullYear() &&
      this.selectedDate.getMonth() === cell.date.getMonth() &&
      this.selectedDate.getDate() === cell.date.getDate()
    );
  }

  confirm() {
    if (this.selectedDate) {
      this.dateSelected.emit(this.selectedDate);
    }
  }

  cancel() {
    this.cancelled.emit();
  }
}
