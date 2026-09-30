"use client";

import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

type LocationPickerProps = {
  latitude: number;
  longitude: number;
  onLocationChange: (
    latitude: number,
    longitude: number,
    address: string,
  ) => void;
};

const DHAKA = { latitude: 23.8103, longitude: 90.4125 };

const markerIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

async function getAddress(latitude: number, longitude: number) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
    );
    if (!response.ok) return "";

    const data = await response.json();
    return data.display_name || "";
  } catch {
    return "";
  }
}

// Map e click korle location + address parent ke pathay
function ClickHandler({
  onLocationChange,
}: Pick<LocationPickerProps, "onLocationChange">) {
  useMapEvents({
    click: async (event) => {
      const { lat, lng } = event.latlng;
      const address = await getAddress(lat, lng);
      onLocationChange(lat, lng, address);
    },
  });

  return null;
}

// Location change hole map ke oi jayga te niye jay
function MapMover({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (latitude && longitude) {
      map.setView([latitude, longitude], 16, { animate: true });
    }
  }, [latitude, longitude, map]);

  return null;
}

export default function LocationPicker({
  latitude,
  longitude,
  onLocationChange,
}: LocationPickerProps) {
  const hasLocation = latitude !== 0 && longitude !== 0;

  return (
    <div className="space-y-2">
      <div className="overflow-hidden rounded-xl border bg-muted">
        <MapContainer
          center={[latitude || DHAKA.latitude, longitude || DHAKA.longitude]}
          zoom={13}
          scrollWheelZoom
          className="h-80 w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapMover latitude={latitude} longitude={longitude} />
          <ClickHandler onLocationChange={onLocationChange} />

          {hasLocation && (
            <Marker position={[latitude, longitude]} icon={markerIcon} />
          )}
        </MapContainer>
      </div>

      {hasLocation && (
        <p className="text-xs text-muted-foreground">
          Click anywhere on the map to change the pickup location.
        </p>
      )}
    </div>
  );
}
