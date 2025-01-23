import CarImage from "../../assets/login-car.webp";

type HeaderProps = {
    title: string;
    image?: string;
};

const Header = ({ title, image = CarImage }: HeaderProps) => {
    return (
        <div className="w-full h-80 bg-grey px-10 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-semibold mb-4">{title}</h1>
                <span>Bosh sahifa - </span>
                <span>{title}</span>
            </div>
            <img src={image} width={400} alt="" />
        </div>
    );
};

export default Header;
