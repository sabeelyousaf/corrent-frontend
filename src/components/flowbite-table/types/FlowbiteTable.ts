import { JSX, ReactElement } from 'react';

import { PageInfo } from './PageInfo';

export type ColumnType<T, K extends keyof T> = {
  key?: K;
  header: string;
  cell?: (obj: T) => ReactElement | string | null;
  className?: string;
  isSortable?: boolean;
};

export interface FlowbiteTableProps<T, K extends keyof T> {
  data: Array<T>;
  columns: Array<ColumnType<T, K>>;
  striped?: boolean;
  placeHolder?: string | JSX.Element;
  onRowClick?: (row: T) => void;
  hasIndex?: boolean;
  withSort?: boolean | false;
  sortParams?: Array<{ column: string; order: 'asc' | 'desc' }>;
  onSortUpdate?: (newSortCriteria: { column: string; order: 'asc' | 'desc' }[]) => void;
  shouldClearFilters?: boolean;
  isLoading?: boolean;
  willExpand?: boolean;
  expandableComponent?: (row: T) => JSX.Element;
  pageInfo?: PageInfo;
}
