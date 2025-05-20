export interface Avatar {
  id: string;
  name: string;
  extension: AvatarExtension;
  size: number;
}

export type AvatarExtension = 'Jpg' | 'Jpeg' | 'Png' | 'Gif'; 

export interface Citizenship {
  code: string;
  id: string;
  name: string;
}

export interface Contact {
  value: string;
  type: ContactType;
}

export type ContactType = 'Phone' | 'Email' | 'SocialMedia';

export type Gender = 'NotDefined' | 'Male' | 'Female';

export type UserType = 'Student' | 'Employee' | 'Admin'; 

export interface Profile {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  birthDate: string; 
  gender: Gender;
  avatar: Avatar;
  citizenship: Citizenship | null;
  address: string | null;
  contacts: Contact[];
  userTypes: UserType[];
}
