import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EducationEntry } from '../../../../shared/types/profile/education';
import { RoleType } from '../role-selector/role-selector.component';
import { CommonModule } from '@angular/common';
import { PostEntry } from '../../../../shared/types/profile/work-info';

export interface TabItem {
  id: string;
  title: string;
  subtitle?: string;
}

@Component({
  selector: 'app-info-sections',
  imports: [CommonModule],
  templateUrl: './info-sections.component.html',
  styleUrl: './info-sections.component.scss',
})
export class InfoSectionsComponent {
  @Input() role!: RoleType;

  @Input() educationEntries: EducationEntry[] = [];

  @Input() workPosts: PostEntry[] = [];

  @Input() selectedIndex: number = 0;

  @Output() selectedIndexChange = new EventEmitter<number>();

  get tabs(): TabItem[] {
    if (this.role === 'student') {
      return this.educationEntries.map((entry) => ({
        id: entry.id,
        title: entry.faculty.name,
        subtitle: `${entry.educationLevel.name} / ${entry.educationStatus.name}`,
      }));
    } else {
      return this.workPosts.map((post) => ({
        id: post.id,
        title: post.postName.name,
        subtitle: post.postType.name,
      }));
    }
  }

  get selectedEducation(): EducationEntry | null {
    return this.role === 'student'
      ? this.educationEntries[this.selectedIndex] ?? null
      : null;
  }

  get selectedPost(): PostEntry | null {
    return this.role === 'employee'
      ? this.workPosts[this.selectedIndex] ?? null
      : null;
  }

  onTabClick(i: number): void {
    if (i !== this.selectedIndex) {
      this.selectedIndexChange.emit(i);
    }
  }
}
