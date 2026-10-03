"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { Search } from "lucide-react";

import "leaflet/dist/leaflet.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

async function searchLocation(query: string) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(query)}&limit=5`,
    );
    if (!response.ok) return [];

    const data = await response.json();
    return data.map((item: any) => ({
      name: item.display_name,
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
    }));
  } catch {
    return [];
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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    { name: string; latitude: number; longitude: number }[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    const results = await searchLocation(searchQuery);
    setSearchResults(results);
    setIsSearching(false);

    // First result automatically select kore dibo
    if (results.length > 0) {
      const first = results[0];
      onLocationChange(first.latitude, first.longitude, first.name);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-2">
      {/* Search Input */}
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search hospital by name or address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={handleSearch}
          disabled={isSearching || !searchQuery.trim()}
          size="icon"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Search Results Dropdown */}
      {searchResults.length > 0 && (
        <div className="rounded-md border bg-background p-2 space-y-1 max-h-40 overflow-y-auto">
          {searchResults.map((result, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                onLocationChange(
                  result.latitude,
                  result.longitude,
                  result.name,
                );
                setSearchResults([]);
                setSearchQuery("");
              }}
              className="w-full text-left text-sm p-2 rounded hover:bg-accent transition-colors"
            >
              {result.name}
            </button>
          ))}
        </div>
      )}

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
