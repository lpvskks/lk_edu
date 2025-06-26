import { Component, EventEmitter, Output } from '@angular/core';
import { AlphabetItemComponent } from '../alphabet-item/alphabet-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alphabet',
  imports: [AlphabetItemComponent, CommonModule],
  templateUrl: './alphabet.component.html',
  styleUrl: './alphabet.component.scss',
})
export class AlphabetComponent {
  @Output() letterSelected = new EventEmitter<string>();

  letters = [
    'А',
    'Б',
    'В',
    'Г',
    'Д',
    'Е',
    'Ё',
    'Ж',
    'З',
    'И',
    'Й',
    'К',
    'Л',
    'М',
    'Н',
    'О',
    'П',
    'Р',
    'С',
    'Т',
    'У',
    'Ф',
    'Х',
    'Ц',
    'Ч',
    'Ш',
    'Щ',
    'Э',
    'Ю',
    'Я',
  ];
  expanded = false;
  selectedLetter = '';

  toggle() {
    this.expanded = !this.expanded;
  }

  onSelect(letter: string) {
    this.selectedLetter = letter;
    this.letterSelected.emit(letter);
  }
}
