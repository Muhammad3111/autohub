import { CiLocationOn, CiMail, CiPhone, CiTimer } from "react-icons/ci";
import Header from "../../components/header/Header";
import MapComponent from "../../components/map/Map";
import Button from "../../utility/button/Button";

const Contact = () => {
    return (
        <div className="w-full">
            <Header title="Contact Us" />
            <div>
                <div className="w-full bg-white mt-10 p-10">
                    <MapComponent />

                    <div className="grid grid-cols-2 mt-20">
                        <div className="flex flex-col gap-10 items-center">
                            <h1 className="text-3xl font-medium">
                                We Love To Help
                            </h1>
                            <p className="text-center">
                                Consectetur adipiscing elit. Nam hendrerit nisi
                                sed sollicitudin pellentesque. Nunc posuere
                                purus rhoncus pulvinar aliquam. aliquet
                                tristique nisl vitae volutpat.{" "}
                            </p>

                            <div className="grid grid-cols-2 w-full gap-4">
                                <input
                                    type="text"
                                    placeholder="First name"
                                    className="h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-primary duration-150"
                                />
                                <input
                                    type="text"
                                    placeholder="Last name"
                                    className="h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-primary duration-150"
                                />
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-primary duration-150"
                                />
                                <input
                                    type="text"
                                    placeholder="Phone number"
                                    className="h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-primary duration-150"
                                />
                                <textarea
                                    placeholder="Message here"
                                    className="h-[200px] p-4 rounded-md outline-none text-lg border focus:border-primary duration-150 col-span-2"
                                ></textarea>
                                <div className="col-span-2">
                                    <Button className="px-10">Submit</Button>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                            <div className="flex flex-col items-center gap-1 group cursor-pointer">
                                <div className="w-20 h-20 flex flex-col items-center justify-center text-5xl border text-[#aaa] group-hover:text-primary border-[#aaa] group-hover:border-primary rounded-full duration-150">
                                    <CiLocationOn />
                                </div>
                                <p className="text-[#aaa] group-hover:text-primary duration-150 text-center">
                                    Namangan Region, <br /> Namangan City
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-1 group cursor-pointer">
                                <div className="w-20 h-20 flex flex-col items-center justify-center text-5xl border text-[#aaa] group-hover:text-primary border-[#aaa] group-hover:border-primary rounded-full duration-150">
                                    <CiMail />
                                </div>
                                <p className="text-[#aaa] group-hover:text-primary duration-150">
                                    info@example.com <br /> contact@example.com
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-1 group cursor-pointer">
                                <div className="w-20 h-20 flex flex-col items-center justify-center text-5xl border text-[#aaa] group-hover:text-primary border-[#aaa] group-hover:border-primary rounded-full duration-150">
                                    <CiPhone />
                                </div>
                                <p className="text-[#aaa] group-hover:text-primary duration-150">
                                    +998 77 269 47 77 <br />
                                    +998 99 919 31 11
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-1 group cursor-pointer">
                                <div className="w-20 h-20 flex flex-col items-center justify-center text-5xl border text-[#aaa] group-hover:text-primary border-[#aaa] group-hover:border-primary rounded-full duration-150">
                                    <CiTimer />
                                </div>
                                <p className="text-[#aaa] group-hover:text-primary duration-150 text-center">
                                    Mon - Sat : 9am to 6pm <br /> Sunday :
                                    Closed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Contact;
