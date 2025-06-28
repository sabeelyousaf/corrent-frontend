export interface GetPageType {
    page?: string;
    per_page?: string;
    order_by?: string;
    order?: string;
  }
  export interface PageInfo {
    vars: {
      count_args: string[];
      ends: true;
      limit: number;
      outset: number;
      page: string;
      page_param: string;
      size: number;
      count: number;
      items: string;
    };
    count: number;
    page: number;
    outset: number;
    limit: number;
    offset: number;
    last: number;
    from: number;
    to: number;
    in: number;
    prev: number | null;
    next: number | null;
    pages: number;
  }
  
  export interface GetPageTypeWithId extends GetPageType {
    id?: string;
  }
  
  export interface IndexParamWithPaginationAndSearchTerm extends GetPageType {
    search?: string;
    order?: string;
    order_by?: string;
    sort?: string;
    specie?: string;
    type?: string;
    organization?: string;
    breed?: string;
    range?: string;
    space_id?: string;
    status?: string;
  }
  
  export interface FilterKeyParams {
    specie?: string;
    breed?: string;
    space?: string;
    organization?: string;
    application_dates?: string[];
    application_status?: string;
    application_status_count?: number;
    date_range_number?: number | string;
    user_timezone?: string;
    unit?: string;
    pet_parent?: string;
    pet_category?: string;
  }
  
  export interface IndexParamWithFilterAndPaginationAndSearchTerm extends GetPageType, FilterKeyParams {
    search?: string;
    sort?: string;
  }
  
  export interface ArticleSearchParams extends GetPageType {
    search?: string;
  }
  