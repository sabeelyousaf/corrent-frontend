import React, { JSX, useCallback, useEffect, useMemo, useState } from 'react';
import { FaAngleDown, FaArrowDown } from 'react-icons/fa6';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { CustomFlowbiteTheme } from 'flowbite-react/types';
import { usePagination } from '../../hooks/usePagination';
import {FlowbiteTableProps} from './types/FlowbiteTable'
const theme: CustomFlowbiteTheme['table'] = {
  root: {
    base: 'property-table w-full text-sm text-left border-collapse',
    wrapper: '',
  },
  head: {
    cell: {
      base: 'bg-white border-b border-zinc-400 !bg-zinc-300 !text-black', // force white bg + black text
    },
  },
  row: {
    base: '',
    hovered: '',
    striped: '',
  },
};


export const FlowbiteTable = <T, K extends keyof T>({
  data,
  columns,
  striped,
  placeHolder,
  onRowClick,
  hasIndex,
  willExpand,
  withSort,
  sortParams,
  onSortUpdate,
  isLoading,
  shouldClearFilters,
  expandableComponent,
  pageInfo,
}: FlowbiteTableProps<T, K>): JSX.Element | null => {
  const getColumnValue = useCallback(
    (value: T[K]): string => (value === null || value === undefined ? '' : `${value}`),
    []
  );
  const { currentPage } = usePagination();
  const [searchParams] = useSearchParams();
  const perPage = searchParams.get('perPage');

  const currentPageNumber = Number(currentPage) || 1;
  const itemsPerPage = Number(perPage) || 20;

  const startIndex = pageInfo?.from || (currentPageNumber - 1) * itemsPerPage + 1;

  const sortDefaults = useMemo(() => (withSort ? sortParams || [] : []), [withSort, sortParams]);
  const [sortCriteria, setSortCriteria] = useState<{ column: string; order: 'asc' | 'desc' }[]>(sortDefaults);
  const activeColumns = withSort ? sortCriteria.map(({ column: sortColumn }) => sortColumn) : [];
  const colSpanNumber = hasIndex && willExpand ? columns.length + 2 : hasIndex ? columns.length + 1 : columns.length;

  useEffect(() => {
    if (withSort && shouldClearFilters) {
      setSortCriteria([]);
    }
  }, [withSort, shouldClearFilters]);

  const handleSortByColumn = (column: string): void => {
    setSortCriteria((prev) => {
      const existingIndex = prev.findIndex((sort) => sort.column === column);
      const newSortCriteria =
        existingIndex > -1
          ? prev.map((sort, index) =>
              index === existingIndex
                ? { ...sort, order: sort.order === 'asc' ? 'desc' : ('asc' as 'asc' | 'desc') }
                : sort
            )
          : [...prev, { column, order: 'asc' as 'asc' | 'desc' }];

      // Call the onSortUpdate prop if it exists
      if (onSortUpdate) {
        onSortUpdate(newSortCriteria);
      }

      return newSortCriteria;
    });
  };

  return (
    <div className="max-md:overflow-x-scroll w-full">
      <Table hoverable striped={striped} className="w-full table-auto text-black text-sm shadow-low" theme={theme}>
        <TableHead>
          <TableRow>
          {hasIndex && <TableHeadCell >{'S.n.'}</TableHeadCell>}
          {willExpand && (
            <TableHeadCell scope="col">
              <span className="sr-only">Expand/Collapse Row</span>
            </TableHeadCell>
          )}
          {columns.map((column) => (
            <TableHeadCell key={column.header}>
            <span className="flex items-center gap-1">
              {column.header}
              {withSort && column.isSortable && sortCriteria && (
                <FaArrowDown
                  className={`w-3 h-3 cursor-pointer ${
                    activeColumns.includes(column.key as string) ? 'text-eggplant-base' : 'text-gray-base rotate-180'
                  } ${sortCriteria.find((sortCriterion) => sortCriterion.column === column.key)?.order === 'asc' ? 'rotate-180' : 'rotate-0'} `}
                  onClick={() => handleSortByColumn(String(column.key))}
                />
              )}
            </span>
          </TableHeadCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {isLoading || !data || data.length === 0 ? (
            <TableRow className="bg-white border-gray-extraLight" key="loading">
              <TableCell colSpan={colSpanNumber} key="no-data">
                {isLoading ? (
                  <div className="text-center">
                    <Spinner className="fill-gray-500" size="xl" />
                  </div>
                ) : (
                  <p className="flex items-center justify-center text-base font-normal text-gray-400 text-center px-4 py-8 bg-white">
                    {placeHolder}
                  </p>
                )}
              </TableCell>
            </TableRow>
          ) : (
            <>
              {data.map((row, index) => (
             <React.Fragment key={`fragment-${index}`}>
                  <TableRow
                    key={`row-${index}`}
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    className={classNames('bg-white border-gray-extraLight', { 'hover:cursor-pointer': !!onRowClick })}
                    onClick={() => {
                      willExpand
                        ? document.querySelector(`#row-${index}-body-${index}`)?.classList.toggle('hidden')
                        : onRowClick?.(row);
                    }}
                    id={`row-${index}-header-${index}`}
                    aria-controls={`row-${index}-body-${index}`}
                  >
                    {hasIndex && <TableCell key={`index-${index}`}>{startIndex + index}</TableCell>}
                    {willExpand && (
                      <TableCell className="w-4 p-3" key={`cell-expand-${index}`}>
                        <FaAngleDown />
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell key={String(column.key)} className={column.className}>
                        {column.cell ? column.cell(row) : null}
                        {!column.cell && column.key ? getColumnValue(row[column.key]) : null}
                        {!column.cell && column.key && !getColumnValue(row[column.key]) ? '-' : null}
                      </TableCell>
                    ))}
                  </TableRow>
                  {willExpand && (
                    <TableRow
                      className="hidden w-full flex-1 overflow-x-auto"
                      id={`row-${index}-body-${index}`}
                      key={`expand-row-${index}-body-${index}`}
                      aria-labelledby={`row-${index}-header-${index}`}
                    >
                      <TableCell
                        className="border-b p-4 dark:border-gray-700"
                        colSpan={colSpanNumber}
                        key={`expand-cell-${index}-body-${index}`}
                      >
                        {expandableComponent && expandableComponent(row)}
                      </TableCell>
                    </TableRow>
                  )}
               </React.Fragment>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
