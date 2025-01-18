import React, { useState } from "react";
import Map, {
    Marker,
    NavigationControl,
    FullscreenControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAP_TOKEN;

const MapComponent: React.FC = () => {
    const fixedLatitude = 41.005512;
    const fixedLongitude = 71.661624;

    const [viewport, _setViewport] = useState({
        latitude: fixedLatitude,
        longitude: fixedLongitude,
        zoom: 12,
    });

    return (
        <div className="relative w-full h-[550px] overflow-hidden shadow-lg rounded-md">
            <Map
                initialViewState={viewport}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                <Marker
                    latitude={fixedLatitude}
                    longitude={fixedLongitude}
                    anchor="bottom"
                >
                    <div className="animate-bounce">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="red"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 2c4.42 0 8 3.58 8 8 0 6.1-8 12-8 12s-8-5.9-8-12c0-4.42 3.58-8 8-8zm0 10c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                            />
                        </svg>
                    </div>
                </Marker>

                <NavigationControl position="bottom-right" />

                <FullscreenControl position="top-right" />
            </Map>
        </div>
    );
};

export default MapComponent;
