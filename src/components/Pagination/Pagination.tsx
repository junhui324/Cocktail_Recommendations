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

  return (
    <div className={styles.paginationBar}>
      <button onClick={handlePreviousPageClick}>이전</button>
      {pageNumbers.map((pageNumber) =>
        currentPage === pageNumber ? (
          <span key={pageNumber} style={{ margin: 5 }}>
            {pageNumber}
          </span>
        ) : (
          <NavLink
            to={`?page=${pageNumber}`}
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            style={{ margin: 5 }}
          >
            {pageNumber}
          </NavLink>
        )
      )}
      <button onClick={handleNextPageClick}>다음</button>
    </div>
  );
}

export default Pagination;
