import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './WeatherPagination.module.scss';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageQueryChange: (targetPageNumber: number) => void;
}

const activeStyle = {
  background: 'grey',
  color: 'white',
};

function WeatherPagination({
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
          <span className={styles.activeLink} key={pageNumber}>
            {pageNumber}
          </span>
        ) : (
          <NavLink
            className={styles.link}
            to={`?page=${pageNumber}`}
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </NavLink>
        )
      )}
      <button onClick={handleNextPageClick}>다음</button>
    </div>
  );
}

export default WeatherPagination;
