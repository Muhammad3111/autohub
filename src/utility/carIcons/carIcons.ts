import electrCarWhite from "../../assets/electr-car-white.png";
import electrCarHover from "../../assets/electr-car-hover.png";
import sedanCarWhite from "../../assets/sedan-car-white.png";
import sedanCarHover from "../../assets/sedan-car-hover.png";
import suvCarWhite from "../../assets/suv-car-white.png";
import suvCarHover from "../../assets/suv-car-hover.png";
import mpvCarWhite from "../../assets/mpv-car-white.png";
import mpvCarHover from "../../assets/mpv-car-hover.png";
import sportCarWhite from "../../assets/sport-car-white.png";
import sportCarHover from "../../assets/sport-car-hover.png";
import microvanCarWhite from "../../assets/microvan-car-white.png";
import microvanCarHover from "../../assets/microvan-car-hover.png";
import vanCarWhite from "../../assets/van-car-white.png";
import vanCarHover from "../../assets/van-car-hover.png";
import lightCarWhite from "../../assets/light-car-white.png";
import lightCarHover from "../../assets/light-car-hover.png";

export const carIcons: Record<CarType, CarIconType> = {
    electricity: { white: electrCarWhite, hover: electrCarHover },
    sedan: { white: sedanCarWhite, hover: sedanCarHover },
    suv: { white: suvCarWhite, hover: suvCarHover },
    mpv: { white: mpvCarWhite, hover: mpvCarHover },
    "sport-car": { white: sportCarWhite, hover: sportCarHover },
    "micro-van": { white: microvanCarWhite, hover: microvanCarHover },
    van: { white: vanCarWhite, hover: vanCarHover },
    "light-passenger": { white: lightCarWhite, hover: lightCarHover }
};
