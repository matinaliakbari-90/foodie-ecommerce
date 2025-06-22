"use client";

import { TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';


// Fix marker icons
const DefaultIcon = L.icon({
    iconUrl: 'map/marker-icon.png',
    shadowUrl: 'map/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


// Dynamic import برای حل مشکل SSR
const Map = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });


export default function ContactMap() {

    const position: [number, number] = [33.9850, 51.4096];
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);


    useEffect(() => {
        L.Marker.prototype.options.icon = DefaultIcon;
    }, []);

    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.openPopup();
        }
    }, []);

    return (
        <div id="map" className="h-100 position-relative" style={{ height: '345px', borderRadius: '8px', overflow: 'hidden' }}>
            <Map center={position} zoom={14} ref={mapRef} className="h-100 w-100">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}
                    eventHandlers={{ add: (e) => { markerRef.current = e.target; e.target.openPopup(); } }}>
                    <Popup className="bootstrap-popup" closeButton={false} autoClose={false} closeOnEscapeKey={false}>
                        <div className="p-2 text-center">
                            <h5 className="fw-bold text-info mb-0" style={{ fontFamily: "Vazir" }} >فودی</h5>
                        </div>
                    </Popup>
                </Marker>
            </Map>
        </div>
    );
};