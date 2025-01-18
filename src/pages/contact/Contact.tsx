import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MapComponent from "../../components/map/Map";

const Contact = () => {
    return (
        <div>
            <Header title="Contact Us" />
            <div className="w-full bg-white mt-10 p-20">
                <div className="container mx-auto">
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

                            <div className="grid grid-cols-2 w-full">
                                <input
                                    type="text"
                                    placeholder="First name"
                                    className=""
                                />
                                <input type="text" placeholder="Last name" />
                                <input type="text" placeholder="Email" />
                                <input type="text" placeholder="Phone number" />
                                <textarea
                                    placeholder="Message here"
                                    className="col-span-2"
                                ></textarea>
                                <div className="col-span-2">
                                    <button>Submit</button>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4"></div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Contact;
