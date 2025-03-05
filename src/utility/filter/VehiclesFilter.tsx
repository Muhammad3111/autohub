import { useContext } from "react";
import data from "../../mock/data.json";
import { Context } from "../../context/Context";

export default function VehicleFilter() {
    const context = useContext(Context);
    if (!context) {
        throw new Error(
            "Ushbu component context providerdan tashqarida ishlatilmoqda"
        );
    }

    const { price, setPrice, model, setModel } = context;
    const ChangePrice = (id: number, start: number, end: number) => {
        setPrice({ id, start, end });
    };
    const changeModel = (model: string) => {
        setModel(model);
    };
    const collections: Collection[] = data.collection;
    const priceButtons: PriceButton[] = data.priceButtons;
    return (
        <form className="flex flex-col items-start gap-4 w-full">
            <div className="flex items-start gap-4">
                <span className="font-semibold text-primary">Narxi: </span>
                <div className="flex gap-4 items-center flex-wrap">
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
                            {p.title}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <span className="font-semibold text-primary">
                    {" "}
                    Klassifikatsiyi:{" "}
                </span>
                <div className="flex items-center gap-4">
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
                            {c.title}
                        </button>
                    ))}
                </div>
            </div>
        </form>
    );
}
