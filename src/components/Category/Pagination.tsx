import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface paginationPropsType {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: paginationPropsType) {
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
      setCurrentPage(() => currentPage - 1);
    }
  };

  const handlePageClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    pageNumber: number
  ) => {
    e.preventDefault();
    setCurrentPage(() => pageNumber);
  };

  const handleNextPageClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(() => currentPage + 1);
    }
  };

  return (
    <>
      <div>
        <button onClick={handlePreviousPageClick}>이전</button>
        {pageNumbers.map((pageNumber) =>
          currentPage === pageNumber ? (
            <span key={pageNumber} style={{ margin: 5 }}>
              {pageNumber}
            </span>
          ) : (
            <NavLink
              to={
                pageNumber !== 1 ? `/category/page/${pageNumber}` : `/category`
              }
              key={pageNumber}
              onClick={(e) => handlePageClick(e, pageNumber)}
              style={{ margin: 5 }}
            >
              {pageNumber}
            </NavLink>
          )
        )}
        <button onClick={handleNextPageClick}>다음</button>
      </div>
    </>
  );
}

export default Pagination;
