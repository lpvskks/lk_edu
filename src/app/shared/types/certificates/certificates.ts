export interface EnumDto<T extends string = string> {
  value: number;
  name: T;
  displayName: string;
}

export interface FileDto {
  id: string;
  name: string;
  extension: string;
  size: number;
}

export type CertificateStatus = 'Created' | 'InProcess' | 'Finished';

export interface CertificateRecord {
  id: string;

  status: CertificateStatus;
  statusEnumDto: EnumDto<CertificateStatus> | null;

  type: string | null;
  typeEnumDto: EnumDto<string> | null;

  staffType: string | null;
  staffTypeEnumDto: EnumDto<string> | null;

  userType: string;
  userTypeEnumDto: EnumDto<'Student' | 'Employee' | string>;

  certificateFile: FileDto | null;
  signatureFile: FileDto | null;

  dateOfForming: string;

  receiveType: string;
  receiveTypeEnumDto: EnumDto<'Electronic' | 'Paper' | string>;
}

export interface CertificateCreateDto {
  type: string | null;
  staffType: string | null;
  userType: 'Student' | 'Employee';
  educationEntryId: string | null;
  employeePostId: string | null;
  receiveType: 'Electronic' | 'Paper';
}

export interface SelectOption {
  value: string;
  viewValue: string;
}

export interface OrderInfo {
  type: string | null;         
  receiveType: 'Electronic' | 'Paper' | null; 
}