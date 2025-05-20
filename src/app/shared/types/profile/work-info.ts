export interface NamedEntity {
  id: string;
  name: string;
}

export type ExperienceType = 'Common' | 'Pedagogical' | 'OnCurrentPlace';

export interface ExperienceEntry {
  id: string;
  years: number;
  months: number;
  type: ExperienceType;
}

export interface Department {
  id: string;
  parentId: string | null;
  name: string;
  email: string;
}

export type EmploymentType = 'MainPlace' | 'Freelance' | 'InnerPartTime';

export interface PostEntry {
  id: string;
  rate: number;
  departments: Department[];
  postType: NamedEntity;
  postName: NamedEntity;
  dateStart: string;      
  dateEnd: string;          
  employmentType: EmploymentType;
}

export interface WorkRecord {
  id: string;
  experience: ExperienceEntry[];
  posts: PostEntry[];
}
