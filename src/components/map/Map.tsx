import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAP_TOKEN;

const MapComponent: React.FC = () => {
    const [viewport, setViewport] = useState({
        latitude: 41.005512,
        longitude: 71.661624,
        zoom: 12,
    });
    const [userLocation, setUserLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    setViewport({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        zoom: 13,
                    });
                },
                (error) => {
                    setErrorMessage(
                        "Unable to retrieve your location. Please check your permissions."
                    );
                    console.error("Geolocation error:", error.message);
                }
            );
        } else {
            setErrorMessage("Geolocation is not supported by your browser.");
        }
    }, []);

    return (
        <div className="relative w-full h-[550px] overflow-hidden shadow-lg rounded-md">
            {errorMessage && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm p-3 rounded-md shadow-md z-10">
                    {errorMessage}
                </div>
            )}
            <Map
                initialViewState={viewport}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                {userLocation && (
                    <Marker
                        latitude={userLocation.latitude}
                        longitude={userLocation.longitude}
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
                )}
            </Map>
        </div>
    );
};

export default MapComponent;
