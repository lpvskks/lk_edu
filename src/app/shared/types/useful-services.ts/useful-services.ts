export type AvatarExtension = 'Jpg' | 'Jpeg' | 'Png' | 'Gif';

export interface Logo {
  id: string;
  name: string;
  extension: AvatarExtension;
  size: number;
}

export type ResourceCategory = 'Employees' | 'ForAll' | 'Students';

export interface ResourceItem {
  id: string;
  category: ResourceCategory;
  title: string;
  description: string;
  link: string;
  termsOfDisctribution: string;
  logo: Logo | null;
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

export interface PagedResourcesResponse {
  results: ResourceItem[];
  metaData: MetaData;
}
