import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const [currentRange, setCurrentRange] = useState(
    Math.floor((currentPage - 1) / 5) // Sahifa diapazoni (har bir diapazon 5 ta tugma)
  );

  const buttonsPerPage = 5;

  // Sahifa tugmasi bosilganda
  const handlePageClick = (page: number) => {
    onPageChange(page); // Sahifa o'zgarishini tashqi tomonga uzatadi
  };

  // Oldingi tugma bosilganda
  const handlePrevious = () => {
    if (currentRange > 0) {
      setCurrentRange(currentRange - 1);
    }
  };

  // Keyingi tugma bosilganda
  const handleNext = () => {
    if ((currentRange + 1) * buttonsPerPage < totalPages) {
      setCurrentRange(currentRange + 1);
    }
  };

  // Tugmalar diapazonini hisoblash
  const startPage = currentRange * buttonsPerPage + 1;
  const endPage = Math.min(startPage + buttonsPerPage - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex items-center w-full justify-center py-4">
      {/* Oldingi tugma */}
      {currentRange > 0 && (
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={handlePrevious}
        >
          &lt;
        </button>
      )}

      {/* Raqamli tugmalar */}
      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "text-black rounded-full w-10 h-10 text-base border-2 border-black flex items-center justify-center"
                : "bg-gray-200 text-black rounded-full w-10 h-10 text-base border-2 border-black flex items-center justify-center"
            } hover:bg-gray-300`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Keyingi tugma */}
      {endPage < totalPages && (
        <button onClick={handleNext}>
          <IoIosArrowForward className="text-xl text-black hover:text-primary duration-300" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
