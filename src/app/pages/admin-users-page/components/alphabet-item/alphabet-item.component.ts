import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alphabet-item',
  imports: [],
  templateUrl: './alphabet-item.component.html',
  styleUrl: './alphabet-item.component.scss',
})
export class AlphabetItemComponent {
  @Input() label!: string;
  @Input() selected = false;
  @Output() select = new EventEmitter<string>();
}
