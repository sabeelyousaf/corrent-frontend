import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePagination = (
  resultsPerPage = '20'
): { perPage: string; currentPage: string; handlePageChange: (page: number, newPerPage?: number) => void } => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || resultsPerPage;
  const currentPage = searchParams.get('page') || '1';
  const handlePageChange = useCallback(
    (page: number, newPerPage?: number): void => {
      searchParams.set('page', `${page}`);
      searchParams.set('perPage', `${newPerPage || perPage}`);
      setSearchParams(searchParams);
    },
    [searchParams, perPage, setSearchParams]
  );

  return { perPage, currentPage, handlePageChange };
};
