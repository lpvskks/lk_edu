export interface NamedEntity {
  id: string;
  name: string;
}

export interface Faculty extends NamedEntity {}
export interface Group extends NamedEntity {}
export interface EducationStatus extends NamedEntity {}
export interface EducationBase extends NamedEntity {}
export interface EducationDirection extends NamedEntity {}
export interface EducationProfile extends NamedEntity {}
export interface EducationQualification extends NamedEntity {}
export interface EducationLevel extends NamedEntity {}
export interface EducationForm extends NamedEntity {}
export interface EducationYears extends NamedEntity {}

export interface EducationEntry {
  id: string;
  faculty: Faculty;
  group: Group;
  educationStatus: EducationStatus;
  educationBase: EducationBase;
  educationDirection: EducationDirection;
  educationProfile: EducationProfile;
  educationQualification: EducationQualification;
  educationLevel: EducationLevel;
  educationForm: EducationForm;
  educationYears: EducationYears;
  creditBooknumber: string;
  course: number;
  admissionYear: number;
}

export interface EducationRecord {
  id: string;
  educationEntries: EducationEntry[];
}
