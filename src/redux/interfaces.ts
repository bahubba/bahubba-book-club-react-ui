export interface AuthPayload {
  username: string | null;
}

export interface PaginatedPayload {
  pageNum: number;
  pageSize: number;
}

export interface PaginatedBookClubSearchPayload extends PaginatedPayload {
  searchTerm: string;
}

export interface PaginatedBookClubPayload extends PaginatedPayload {
  bookClubName: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  empty: boolean;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  fetchedPages?: number[];
}

export interface ErrorResponse<T> {
  status: number;
  data: {
    message: string;
    data?: T;
  };
}
