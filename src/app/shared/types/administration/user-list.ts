export interface User {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  birthDate: string;    
}

export interface MetaData {
  pageCount: number;
  totalItemCount: number;
  pageNumber: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  firstItemOnPage: number;
  lastItemOnPage: number;
}

export interface UserListResponse {
  results: User[];
  metaData: MetaData;
}
