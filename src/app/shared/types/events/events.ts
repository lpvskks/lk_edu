export interface MetaData {
  pageCount:       number;
  totalItemCount:  number;
  pageNumber:      number;
  pageSize:        number;
  hasPreviousPage: boolean;
  hasNextPage:     boolean;
  isFirstPage:     boolean;
  isLastPage:      boolean;
  firstItemOnPage: number;
  lastItemOnPage:  number;
}

export interface PublicEventsResponse {
  results: EventDto[];
  metaData: MetaData;
}

export interface EventDto {
  id:               string;
  title:            string;
  description:      string;
  picture:          PictureDto;
  isTimeFromNeeded: boolean;
  dateTimeFrom:     string; 
  isTimeToNeeded:   boolean;
  dateTimeTo:       string; 
  type:             'Open' | 'Closed';
  format:           'Online' | 'Offline' | 'Hybrid';
  auditory:         'All' | 'Students' | 'Employees';
  status:           'Draft' | 'Published' | 'Canceled';
}

export interface PictureDto {
  id:        string;
  name:      string;
  extension: 'NotDefined' | 'Jpg' | 'Png' | 'Gif' | 'Pdf';
  size:      number;
}
