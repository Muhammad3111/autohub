import { useTranslation } from "react-i18next";
import EmptyImg from "../../assets/find-car.png";

const EmptySearch = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center h-[600px]">
            <img src={EmptyImg} width={200} alt="" />
            <p className="text-2xl font-semibold mt-10 mb-2">
                {t("search-page.search-not-found")}
            </p>
            <p className="text-lg font-medium">
                {t("search-page.search-other")}
            </p>
        </div>
    );
};
export default EmptySearch;
