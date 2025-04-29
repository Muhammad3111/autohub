import Header from "../../components/header/Header";

import About1 from "../../assets/about-1.png";
import About2 from "../../assets/about-2.png";
import About3 from "../../assets/about-3.png";
import About4 from "../../assets/about-4.png";
import About5 from "../../assets/about-5.png";
import About6 from "../../assets/about-6.png";
import About7 from "../../assets/about-7.png";
import About8 from "../../assets/about-8.png";
import AboutSlider from "./AboutSlider";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "../../features/auth/authSlice";
import AboutPartner from "./AboutPartner";

type AboutState = {
    img: string;
    title_uz: string;
    title_ru: string;
    desc_uz: string;
    desc_ru: string;
    isBorder: boolean;
};

const AboutUs = () => {
    const carsAbout: AboutState[] = [
        {
            img: About1,
            title_uz: "Avtomobillar keng tanlovi",
            desc_uz:
                "Turli xil avtomobillar tanlovi bilan har qanday ehtiyojingizga mos mashinani topishingiz mumkin.",
            title_ru: "Широкий выбор автомобилей",
            desc_ru:
                "Вы найдете автомобиль, соответствующий любым вашим требованиям, благодаря нашему широкому ассортименту.",
            isBorder: false
        },
        {
            img: About2,
            title_uz: "Sug'urta va maxsus takliflar",
            desc_uz:
                "Bizda mashina ijarasi uchun sug'urta va maxsus chegirmali takliflar mavjud.",
            title_ru: "Страхование и специальные предложения",
            desc_ru:
                "Мы предлагаем страхование аренды автомобилей и специальные скидочные акции для наших клиентов.",
            isBorder: true
        },
        {
            img: About3,
            title_uz: "Ajoyib mijozlarga xizmat ko'rsatish",
            desc_uz:
                "Biz har bir mijozimizga yuqori darajadagi xizmat ko'rsatishni kafolatlaymiz.",
            title_ru: "Отличное обслуживание клиентов",
            desc_ru:
                "Мы гарантируем высококлассное обслуживание для каждого нашего клиента.",
            isBorder: true
        },
        {
            img: About4,
            title_uz: "Hududiy avtomobil xizmati",
            desc_uz:
                "Sizga yaqin hududlarda tez va qulay avtomobil xizmatlarini taklif etamiz.",
            title_ru: "Локализованный автосервис",
            desc_ru:
                "Мы предоставляем удобные услуги аренды автомобилей в вашем регионе.",
            isBorder: true
        },
        {
            img: About5,
            title_uz: "Oson bron qilish jarayoni",
            desc_uz:
                "Oddiy va tezkor bron qilish jarayoni orqali mashinani istalgan vaqtda ijaraga oling.",
            title_ru: "Простой процесс бронирования",
            desc_ru:
                "Бронируйте автомобиль быстро и легко в любое удобное для вас время.",
            isBorder: false
        },
        {
            img: About6,
            title_uz: "Mukammal texnik xizmat ko'rsatish",
            desc_uz:
                "Bizning barcha mashinalarimiz muntazam texnik xizmat ko'rsatishdan o'tkaziladi va a'lo holatda saqlanadi.",
            title_ru: "Тщательно обслуживаемые автомобили",
            desc_ru:
                "Все наши автомобили проходят регулярное техническое обслуживание и находятся в отличном состоянии.",
            isBorder: true
        },
        {
            img: About7,
            title_uz: "A'zolik va mukofotlar tizimi",
            desc_uz:
                "Doimiy mijozlar uchun a'zo dasturlar va maxsus mukofotlar tizimini taqdim etamiz.",
            title_ru: "Членство и программа вознаграждений",
            desc_ru:
                "Для постоянных клиентов доступны программы членства и бонусные вознаграждения.",
            isBorder: true
        },
        {
            img: About8,
            title_uz: "Moslashuvchan ijaraga olish variantlari",
            desc_uz:
                "Siz uchun mos ijaraning turli shartlari va variantlarini taklif qilamiz.",
            title_ru: "Гибкие условия аренды",
            desc_ru:
                "Мы предлагаем различные условия аренды автомобилей для вашего удобства.",
            isBorder: true
        }
    ];

    const { t } = useTranslation();
    const currentLanguage = useSelector(selectCurrentLanguage) || "uz";

    return (
        <div className='w-full'>
            <Header title={t("about-page.header-title")} />
            <div className='bg-white'>
                <div className='flex flex-col p-10'>
                    <h1 className='text-2xl text-center font-medium'>
                        {t("about-page.our-partners")}
                    </h1>

                    <div className='p-10'>
                        <AboutSlider />
                    </div>

                    <div className='text-2xl text-center font-medium mb-10'>
                        {t("about-page.why-we-are")}{" "}
                        {t("about-page.why-choose-us")}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {carsAbout.map((item, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer border-2 w-[300px]`}
                            >
                                <div className='flex flex-col items-center text-center space-y-4'>
                                    <div className='w-10 h-10 flex items-center justify-center'>
                                        <img
                                            src={item.img}
                                            alt={
                                                currentLanguage === "uz"
                                                    ? item.title_uz
                                                    : item.title_ru
                                            }
                                            className='w-full h-full object-contain'
                                        />
                                    </div>

                                    <h3 className='text-lg font-semibold'>
                                        {currentLanguage === "uz"
                                            ? item.title_uz
                                            : item.title_ru}
                                    </h3>

                                    <p className='text-gray-600 text-xs leading-relaxed'>
                                        {currentLanguage === "uz"
                                            ? item.title_uz
                                            : item.title_ru}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <AboutPartner />
        </div>
    );
};

export default AboutUs;
