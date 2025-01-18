import CarImage from "../../assets/login-car.webp";

type HeaderProps = {
    title: string;
    image?: string;
};

const Header = ({ title, image = CarImage }: HeaderProps) => {
    return (
        <div className="w-full h-[420px] flex items-center bg-white px-0 xl:px-[100px] rounded">
            <div className="flex items-center justify-between my-container">
                <div>
                    <h1 className="text-3xl font-semibold mb-4">{title}</h1>
                    <span>Bosh sahifa - </span>
                    <span>{title}</span>
                </div>
                <img src={image} width={500} alt="" />
            </div>
        </div>
    );
};

export default Header;
