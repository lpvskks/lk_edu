import { PictureDto } from "./events";

export interface AuthorDto {
  id: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  birthDate: string;
  gender: string;
  email: string;
  avatar: PictureDto;
}

export interface ParticipantDto {
  id: string;
  user: AuthorDto;
  email: string;
  name: string;
  phone: string;
  additionalInfo: string;
  participantType: string;
}

export interface EventDetailDto {
  id: string;
  title: string;
  description: string;
  picture: PictureDto;
  isTimeFromNeeded: boolean;
  dateTimeFrom: string;
  isTimeToNeeded: boolean;
  dateTimeTo: string;
  type: string;
  format: string;
  auditory: string;
  status: string;
  link: string;
  addressName: string;
  latitude: number;
  longitude: number;
  isRegistrationRequired: boolean;
  registrationLastDate: string;
  isDigestNeeded: boolean;
  notificationText: string;
  digestText: string;
  author: AuthorDto;
  participants: ParticipantDto[];
}

export interface RegistrationData {
  name: string;
  phone: string;
  email: string;
  additionalInfo: string;
}