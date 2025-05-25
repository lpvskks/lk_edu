import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type RoleType = 'student' | 'employee';

@Component({
  selector: 'app-role-selector',
  imports: [CommonModule],
  templateUrl: './role-selector.component.html',
  styleUrl: './role-selector.component.scss',
})
export class RoleSelectorComponent {
  @Input() visible: boolean = false;

  @Input() selectedRole: RoleType = 'student';
  @Output() roleChange = new EventEmitter<RoleType>();

  selectRole(role: RoleType): void {
    if (role !== this.selectedRole) {
      this.roleChange.emit(role);
    }
  }
}
