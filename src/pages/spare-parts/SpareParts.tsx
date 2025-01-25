import Header from "../../components/header/Header";
import { useGetSparesQuery } from "../../features/spare-parts/spare-parts";
import { useEffect, useState } from "react";
import Filter from "../../utility/filter/Filter";
import Pagination from "../../utility/pagination/Pagination";
import SpareCard, { Product } from "../../components/spare-card/SpareCard";

const SpareParts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    name_uz: "",
    brand: "",
    model: "",
    price: 0,
  });
  const { data } = useGetSparesQuery({ page: 1 });
  useEffect(() => {
    if (data?.total_pages) {
      setTotalPages(data.total_pages); // Birinchi so‘rov amalga oshirilgandan keyin skip-ni true qilib qo‘yish
    }
  }, [data?.total_pages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Sahifani yangilaydi
  };

  const spareParts: Product[] = data?.items || [];

  return (
    <div>
      <Header title="Ehtiyot qisimlar" />
      <div className="flex flex-col gap-4 my-container pt-10">
        <div className="flex flex-col gap-4 items-center">
          <Filter setFilters={setFilters} filters={filters} />
        </div>
        <div className="grid grid-cols-4 gap-4 py-6">
          {spareParts.map((spare) => (
            <SpareCard key={spare.id} spares={spare} />
          ))}
        </div>
      </div>
      <div className="w-full">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
export default SpareParts;
