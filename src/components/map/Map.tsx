import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAP_TOKEN;

const MapComponent: React.FC = () => {
    const [viewport, setViewport] = useState({
        latitude: 41.005512,
        longitude: 71.661624,
        zoom: 13,
    });
    const [userLocation, setUserLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

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
                    console.error("Geolocation error:", error.message);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    }, []);

    return (
        <div className="relative w-full h-[550px] overflow-hidden shadow-lg rounded-md">
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
                        <img
                            src="https://docs.mapbox.com/help/demos/custom-markers-gl-js/mapbox-icon.png"
                            alt="You are here"
                            className="w-8 h-8"
                        />
                    </Marker>
                )}
                {userLocation && (
                    <Popup
                        latitude={userLocation.latitude}
                        longitude={userLocation.longitude}
                        closeButton={true}
                        closeOnClick={false}
                        offset={25}
                    >
                        <div className="text-sm text-gray-700">
                            You are here!
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
};

export default MapComponent;
