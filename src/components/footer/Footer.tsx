import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { Link } from "react-router-dom";

type Display = {
  display?: string;
};

const Footer = ({ display }: Display) => {
  return (
    <div
      className={`w-full bg-white p-10 mt-10 ${
        display === "none" ? "hidden" : ""
      }`}
    >
      <div className="flex justify-between relative">
        <div className=" w-[300px] font-medium">
          <Link to={"/"} className="text-3xl ">
            Autohub
          </Link>
          <p className="my-6 text-sm font-normal">
            Research has had a very large influence on my life. I have learned
            most of what I know through research.
          </p>

          <p className="text-2xl">Call Centre: 90 123 45 67</p>

          <div className="mt-10">
            <p className="text-xl">Follow Us</p>
            <div className="flex items-center gap-2 mt-4 text-primary">
              <button className="p-2 bg-grey rounded-sm">
                <FiInstagram />
              </button>
              <button className="p-2 bg-grey rounded-sm">
                <FiFacebook />
              </button>
              <button className="p-2 bg-grey rounded-sm">
                <FiYoutube />
              </button>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xl font-medium mb-4">Our Brands</p>
          <ul className="text-sm text-gray-500 font-light leading-7">
            <li>Jaquar</li>
            <li>BMW</li>
            <li>Tayota</li>
            <li>Hyundai</li>
            <li>Honda</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-xl font-medium mb-4">Quick Links</p>
          <ul className="text-sm text-gray-500 font-light leading-7">
            <li>About Us</li>
            <li>News</li>
            <li>Gallery</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="flex flex-col gap-20">
          {/* Address */}
          <div>
            <p className="text-xl font-medium mb-4">Address</p>
            <ul className="text-sm text-gray-500 font-light leading-7">
              <li>30, Commercial Road Raton Australia - 47889 45</li>
              <li>
                Mail: solutions@example.com
                <br />
                Ph: 012 456 789 0123
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xl font-medium mb-4">Branch Address</p>
            <ul className="text-sm text-gray-500 font-light leading-7">
              <li>167 great portland street, DEON Australia - 47889 55</li>
              <li>
                Mail: solutions@example.com
                <br />
                Ph: 012 456 789 0459
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <div className="w-full  h-1 bg-grey"></div>
        <p className="text-sm font-medium text-gray-500 mt-8 text-center">
          @ 2024 Autohub. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
