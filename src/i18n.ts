import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "./locales/ru.json";
import uz from "./locales/uz.json";

const storedLanguage = localStorage.getItem("language") || "uz";

i18n.use(initReactI18next).init({
    fallbackLng: "uz",
    lng: storedLanguage,
    resources: {
        ru: {
            translation: ru,
        },
        uz: {
            translation: uz,
        },
    },
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
