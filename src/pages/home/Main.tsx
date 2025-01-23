import CarImg from "../../assets/dashboard.png";

const Main = () => {
    return (
        <div style={{ height: "calc(100vh - 80px)" }}>
            <img src={CarImg} alt="" className="w-full h-full object-cover" />
        </div>
    );
};
export default Main;
