import CarImage from "../../assets/login-car.webp";

type HeaderProps = {
    title: string;
    image?: string;
};

const Header = ({ title, image = CarImage }: HeaderProps) => {
    return (
        <div className="mb-8 mt-20">
            <div className="w-full h-52 bg-grey px-10 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold mb-4">{title}</h1>
                    <span>Bosh sahifa - </span>
                    <span>{title}</span>
                </div>
                <img src={image} width={200} alt="" />
            </div>
        </div>
    );
};

export default Header;
