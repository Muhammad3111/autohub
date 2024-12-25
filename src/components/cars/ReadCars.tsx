import { IoSpeedometerOutline } from "react-icons/io5";
import { PiGasCan } from "react-icons/pi";
import { TbPropeller } from "react-icons/tb";

export default function ReadCars() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1 flex flex-col rounded-xl shadow-lg border-2 overflow-hidden">
        <div>
          <img
            src="https://imgd.aeplcdn.com/664x374/n/dkalcva_1596121.jpg?q=80"
            alt="tucson"
            className="w-full h-56"
          />
        </div>
        <div className="flex flex-col items-start gap-6 p-4">
          <div className="flex items-start justify-between w-full">
            <h1 className="text-2xl font-bold">Tucson</h1>
            <p className="text-lg font-bold">16000$</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            <li className="p-2 border rounded-md shadow-md">Yil: 2021</li>
            <li className="p-2 border rounded-md shadow-md">Motor: 2.0L</li>
            <li className="p-2 border rounded-md shadow-md">Quvvat: 150HP</li>
            <li className="p-2 border rounded-md shadow-md">Kuzov: SUV</li>
            <li className="p-2 border rounded-md shadow-md">Rang: Qizil</li>
          </ul>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <IoSpeedometerOutline className="text-2xl" />
              <p className="text-base font-bold">12.000 km</p>
            </div>
            <div className="flex items-center gap-2">
              <TbPropeller className="text-2xl" />
              <p className="text-base font-bold">Avtomat</p>
            </div>
            <div className="flex items-center gap-2">
              <PiGasCan className="text-2xl" />
              <p className="text-base font-bold">Benzin</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex flex-col rounded-xl shadow-lg border-2 overflow-hidden">
        <div>
          <img
            src="https://imgd.aeplcdn.com/664x374/n/dkalcva_1596121.jpg?q=80"
            alt="tucson"
            className="w-full h-56"
          />
        </div>
        <div className="flex flex-col items-start gap-6 p-4">
          <div className="flex items-start justify-between w-full">
            <h1 className="text-2xl font-bold">Tucson</h1>
            <p className="text-lg font-bold">16000$</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            <li className="p-2 border rounded-md shadow-md">Yil: 2021</li>
            <li className="p-2 border rounded-md shadow-md">Motor: 2.0L</li>
            <li className="p-2 border rounded-md shadow-md">Quvvat: 150HP</li>
            <li className="p-2 border rounded-md shadow-md">Kuzov: SUV</li>
            <li className="p-2 border rounded-md shadow-md">Rang: Qizil</li>
          </ul>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <IoSpeedometerOutline className="text-2xl" />
              <p className="text-base font-bold">12.000 km</p>
            </div>
            <div className="flex items-center gap-2">
              <TbPropeller className="text-2xl" />
              <p className="text-base font-bold">Avtomat</p>
            </div>
            <div className="flex items-center gap-2">
              <PiGasCan className="text-2xl" />
              <p className="text-base font-bold">Benzin</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex flex-col rounded-xl shadow-lg border-2 overflow-hidden">
        <div>
          <img
            src="https://imgd.aeplcdn.com/664x374/n/dkalcva_1596121.jpg?q=80"
            alt="tucson"
            className="w-full h-56"
          />
        </div>
        <div className="flex flex-col items-start gap-6 p-4">
          <div className="flex items-start justify-between w-full">
            <h1 className="text-2xl font-bold">Tucson</h1>
            <p className="text-lg font-bold">16000$</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            <li className="p-2 border rounded-md shadow-md">Yil: 2021</li>
            <li className="p-2 border rounded-md shadow-md">Motor: 2.0L</li>
            <li className="p-2 border rounded-md shadow-md">Quvvat: 150HP</li>
            <li className="p-2 border rounded-md shadow-md">Kuzov: SUV</li>
            <li className="p-2 border rounded-md shadow-md">Rang: Qizil</li>
          </ul>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <IoSpeedometerOutline className="text-2xl" />
              <p className="text-base font-bold">12.000 km</p>
            </div>
            <div className="flex items-center gap-2">
              <TbPropeller className="text-2xl" />
              <p className="text-base font-bold">Avtomat</p>
            </div>
            <div className="flex items-center gap-2">
              <PiGasCan className="text-2xl" />
              <p className="text-base font-bold">Benzin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
