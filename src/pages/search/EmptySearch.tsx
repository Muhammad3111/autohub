import EmptyImg from "../../assets/find-car.png";

const EmptySearch = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[600px]">
            <img src={EmptyImg} width={200} alt="" />
            <p className="text-2xl font-semibold mt-10 mb-2">
                Biz siz qidirayotgan narsani topa olmadik
            </p>
            <p className="text-lg font-medium">
                Qidirilayotgan narsa nomida xatolik yoki bizda hali bunday narsa
                bo'lmasligi mumkin
            </p>
        </div>
    );
};
export default EmptySearch;
