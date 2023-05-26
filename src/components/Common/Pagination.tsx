import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Pagination.module.scss';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageQueryChange: (targetPageNumber: number) => void;
}

function Pagination({
  totalPages,
  currentPage,
  handlePageQueryChange,
}: PaginationProps) {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const slicePageIdx =
    currentPage % 5 !== 1
      ? currentPage % 5 === 0
        ? currentPage - 4
        : currentPage - (currentPage % 5) + 1
      : currentPage;

  //디버깅
  useEffect(() => {
    console.log('현재페이지', currentPage);
  }, [currentPage]);

  const handlePreviousPageClick = () => {
    if (currentPage > 1) {
      handlePageQueryChange(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    handlePageQueryChange(pageNumber);
  };

  const handleNextPageClick = () => {
    if (currentPage < totalPages) {
      handlePageQueryChange(currentPage + 1);
    }
  };

  const handleFirstPageClick = () => {
    handlePageQueryChange(1);
  };

  const handleLastPageClick = () => {
    handlePageQueryChange(totalPages);
  };

  return (
    <div className={styles.paginationBar}>
      <button onClick={handleFirstPageClick}>{`<<`}</button>
      <button onClick={handlePreviousPageClick}>{`<`}</button>

      {pageNumbers.slice(slicePageIdx - 1, slicePageIdx + 4).map((pageNumber) =>
        currentPage === pageNumber ? (
          <span
            key={pageNumber}
            className={styles.pageNumber}
            id={styles.selected}
          >
            {pageNumber}
          </span>
        ) : (
          <NavLink
            to={`?page=${pageNumber}`}
            className={styles.pageNumber}
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </NavLink>
        )
      )}
      {pageNumbers
        .slice(slicePageIdx - 1, slicePageIdx + 4)
        .includes(totalPages) ? (
        <span></span>
      ) : (
        <span className={styles.reducedNumber}>...</span>
      )}

      <button onClick={handleNextPageClick}>{`>`}</button>
      <button onClick={handleLastPageClick}>{`>>`}</button>
    </div>
  );
}

export default Pagination;
