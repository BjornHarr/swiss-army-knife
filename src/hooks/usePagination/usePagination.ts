import { useState, useEffect } from 'react';

type PaginationFunctions = {
 isFirstPage: boolean;
 nextPage: () => void;
 isLastPage: boolean;
 previousPage: () => void;
};

type Pagination = [
 currentPage: number,
 paginationFunctions: PaginationFunctions
];

export function usePagination(totalPages: number): Pagination {
 const queryParams = new URLSearchParams(window.location.search);
 const initialPage = parseInt(queryParams.get('page') || '0', 10);
 const [currentPage, setCurrentPage] = useState<number>(initialPage);

 const updateUrl = (page: number) => {
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set('page', page.toString());
  window.history.replaceState({}, '', newUrl.toString());
 };

 const handlePageChange = (page: number) => {
  setCurrentPage(page);
  updateUrl(page);
 };

 const isLastPage = currentPage >= totalPages;

 const nextPage = () => {
  if (!isLastPage) {
   handlePageChange(currentPage + 1);
  }
 };

 const isFirstPage = currentPage <= 0;

 const previousPage = () => {
  if (!isFirstPage) {
   handlePageChange(currentPage - 1);
  }
 };

 useEffect(() => {
  handlePageChange(initialPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [initialPage]);

 return [currentPage, { nextPage, isFirstPage, previousPage, isLastPage }];
}
