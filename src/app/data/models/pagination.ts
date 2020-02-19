// Angular
import { InjectionToken } from '@angular/core';

export interface PaginationMetaType {
  page: number;
  perPage: number;
  count: number;
  pageCount: number;
}

export interface PaginationType<T> {
  data: Array<T>;
  meta: PaginationMetaType;
}

export interface PaginationParentType {
  pagination: PaginationMetaType;
  pageChange?: (page: number) => void;
}

export const PAGINATION_PARENT = new InjectionToken<PaginationParentType>('PAGINATION_PARENT');
