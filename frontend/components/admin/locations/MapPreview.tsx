'use client';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon path issues in React
delete (L.Icon.Default.prototype as SafeAny)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ position, setPosition }: { position: [number, number], setPosition: (pos: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

function MapUpdater({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (position[0] && position[1]) {
      map.setView(position, map.getZoom(), { animate: true });
    }
  }, [position, map]);
  return null;
}

interface MapPreviewProps {
  latitude: number;
  longitude: number;
  onChange: (lat: number, lng: number) => void;
}

export default function MapPreview({ latitude, longitude, onChange }: MapPreviewProps) {
  const defaultPos: [number, number] = [21.5222, 39.1718]; // Default to Jeddah if not provided
  const hasPosition = latitude && longitude;
  const initialPosition = hasPosition ? [latitude, longitude] as [number, number] : defaultPos;

  const [position, setPosition] = useState<[number, number]>(initialPosition);

  // Sync internal position state when props change manually from outside
  useEffect(() => {
    if (latitude && longitude && (latitude !== position[0] || longitude !== position[1])) {
      setPosition([latitude, longitude]);
    }
  }, [latitude, longitude]);

  const handlePositionChange = (pos: [number, number]) => {
    setPosition(pos);
    onChange(pos[0], pos[1]);
  };

  return (
    <div className="w-full h-full min-h-[400px] relative z-0">
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={handlePositionChange} />
        <MapUpdater position={position} />
      </MapContainer>
      <div className="absolute top-4 right-4 z-[400] bg-white px-3 py-2 rounded-md shadow-md text-xs font-semibold text-slate-700 pointer-events-none">
        Click anywhere on the map to set location
      </div>
    </div>
  );
}
