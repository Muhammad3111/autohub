import EmptyImg from "../../assets/find-car.png";

const EmptySearch = () => {
    return (
        <div
            className="container mx-auto flex flex-col items-center justify-center"
            style={{ height: "calc(100vh - 656px)" }}
        >
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