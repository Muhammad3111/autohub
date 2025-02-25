import Header from "../../components/header/Header";
import { useGetSparesQuery } from "../../features/spare-parts/spare-parts";
import SpareCard from "../../components/spare-card/SpareCard";
import { useGetSpareCatsQuery } from "../../features/spare-parts/spare-categories";
import Button from "../../utility/button/Button";
import AboutSlider from "../about-us/AboutSlider";
import Footer from "../../components/footer/Footer";

const SpareParts = () => {
  const { data } = useGetSparesQuery({ page: 1 });
  const { data: spareCats } = useGetSpareCatsQuery({});

  const spareParts: SpareParts[] = data?.items || [];
  const categories: SpareCategories[] = spareCats || [];
  return (
    <div className="max-w-[1400px] mx-auto">
      <Header title="Ehtiyot qisimlar" />
      <div className="flex flex-col gap-4 my-container pt-10">
        <div className="flex flex-col gap-4 items-center"></div>
        <div className="flex flex-col gap-4 p-10 bg-white">
          <h1 className="text-3xl font-semibold text-center">
            Ehtiyot qisimlarning <span className="text-primary">Turlari</span>
          </h1>
          <div className="grid grid-cols-6 gap-4 ">
            {categories.slice(0, 12).map((c) => (
              <div
                key={c.id}
                className="flex flex-col items-center gap-2 col-span-1 shadow-md border bg-grey hover:border-red-500 duration-300 p-4"
              >
                <img
                  src="https://scdn.autodoc.de/catalog/categories/150x150/10106.png"
                  alt={c.title_uz}
                  className="w-20 h-20 object-contain"
                />
                <h3 className="text-xl font-semibold">{c.title_uz}</h3>
              </div>
            ))}
            {categories.length > 12 && (
              <div className="col-span-full flex justify-center">
                <Button className="px-4">Barcha bo'limlarni ko'rish</Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 p-10">
          <h1 className="text-4xl font-semibold text-center">
            Eng ommabop
            <span className="text-primary"> Ehtiyot qisim brendlari</span>
          </h1>
          <div className="px-20">
            <AboutSlider />
          </div>
          <div className="col-span-full flex justify-center">
            <Button className="px-4">Barcha brendlarni ko'rish</Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-10 bg-white">
          <h1 className="text-4xl font-semibold text-center">
            Eng reytingi baland{" "}
            <span className="text-primary">Ehtiyot qisimlar</span>
          </h1>
          <div className="grid grid-cols-4 gap-4">
            {spareParts.length > 0 ? (
              spareParts
                .slice(0, 8)
                .map((spare) => <SpareCard key={spare.id} spares={spare} />)
            ) : (
              <div className="col-span-full text-2xl font-semibold text-center py-10 bg-grey">
                <h1 className="text-3xl font-normal text-primary">
                  Ma'lumotlar topilmadi
                </h1>
              </div>
            )}
            {spareParts.length > 6 && (
              <div className="col-span-full flex justify-center">
                <Button className="px-4">Barchasini ko'rish</Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default SpareParts;
