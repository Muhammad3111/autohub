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

type AboutState = {
    img: string;
    title: string;
    desc: string;
    isBorder: boolean;
};

const AboutUs = () => {
    const carsAbout: AboutState[] = [
        {
            img: About1,
            title: "Wide Selection of Vehicles",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            isBorder: false,
        },
        {
            img: About2,
            title: "Insurance & Special Offers",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            isBorder: true,
        },
        {
            img: About3,
            title: "Excellent Customer Service",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            isBorder: true,
        },
        {
            img: About4,
            title: "Locialized Car Service",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            isBorder: true,
        },
        {
            img: About5,
            title: "Easy Booking Process",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            isBorder: false,
        },
        {
            img: About6,
            title: "Well-Maintained Vehicles",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            isBorder: true,
        },
        {
            img: About7,
            title: "Membership and Rewards",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            isBorder: true,
        },
        {
            img: About8,
            title: "Flexible Rental Options",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            isBorder: true,
        },
    ];

    return (
        <div className="bg-white">
            <Header title="About" />
            <div className="flex flex-col gap-20 p-10">
                <h1 className="text-3xl text-center font-medium">
                    Our Partners
                </h1>

                <div className="p-20">
                    <AboutSlider />
                </div>

                <div className="text-3xl text-center font-medium">
                    Why We are{" "}
                    <span className="text-primary cursor-pointer">
                        Specialized!
                    </span>{" "}
                    Why Choose Us?
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {carsAbout.map((item, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer border-2`}
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 flex items-center justify-center">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <h3 className="text-xl font-semibold">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
