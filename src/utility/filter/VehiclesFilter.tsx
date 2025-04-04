import { useContext } from "react";
import data from "../../mock/data.json";
import { Context } from "../../context/Context";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";

export default function VehicleFilter() {
    const { t } = useTranslation();
    const context = useContext(Context);
    if (!context) {
        throw new Error(
            "Ushbu component context providerdan tashqarida ishlatilmoqda"
        );
    }

    const { price, setPrice, model, setModel, selected, setSelected } = context;
    const ChangePrice = (id: number, start: number, end: number) => {
        setPrice({ id, start, end });
    };
    const changeModel = (model: string) => {
        setModel(model);
    };
    const collections: Collection[] = data.collection;
    const priceButtons: PriceButton[] = data.priceButtons;
    return (
        <div className='flex flex-col items-start gap-4 w-full'>
            <div className='flex items-start gap-4'>
                <span className='font-semibold text-primary'>
                    {t("price")}:
                </span>
                <div className='flex gap-4 items-center flex-wrap'>
                    {priceButtons.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => ChangePrice(p.id, p.start, p.end)}
                            className={`text-base border px-2 py-1 ${
                                p.id === price.id
                                    ? "bg-primary text-white"
                                    : "bg-transparent"
                            } duration-150`}
                        >
                            {p.end === 0
                                ? p.start === 0
                                    ? t("home-page.brand-all")
                                    : `${p.start}$ ${t(
                                          "home-page.higher-than"
                                      )}`
                                : p.end === 15000
                                ? `${p.end}$ ${t("home-page.less-than")}`
                                : p.title}
                        </button>
                    ))}
                </div>
            </div>
            <div className='flex gap-2 items-center'>
                <span className='font-semibold text-primary'>
                    {t("classfication")}:
                </span>
                <div className='flex flex-wrap items-center gap-4'>
                    {collections.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => changeModel(c.title)}
                            className={`text-base border uppercase px-2 py-1 ${
                                c.title === model
                                    ? "bg-primary text-white"
                                    : "bg-transparent"
                            }`}
                        >
                            {t(`home-page.brand-${c.value}`)}
                        </button>
                    ))}
                </div>
            </div>

            {selected.name && (
                <button
                    className={`text-base border uppercase px-4 py-1 bg-primary text-white relative`}
                >
                    <div
                        onClick={() => setSelected({ name: "", value: "" })}
                        className='absolute -top-1 -right-1 text-xs bg-black rounded-full text-white'
                    >
                        <FiX />
                    </div>
                    {selected.name}
                </button>
            )}
        </div>
    );
}
