"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Location } from "@/services/map.service";
import { useEffect, useState, useMemo } from "react";

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  locations: Location[];
}

const getIconSVG = (iconName: string): string => {
  const icons: Record<string, string> = {
    carIcon:
      '<path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>',
    peopleIcon:
      '<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>',
    homeIcon: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>',
    beachIcon:
      '<path d="M13.127 14.56l1.43-1.43 6.44 6.443L19.57 21zm4.293-5.73l2.86-2.86c-3.95-3.95-10.35-3.96-14.3-.02 3.93-1.3 8.31-.25 11.44 2.88zM5.95 5.98c-3.94 3.95-3.93 10.35.02 14.3l2.86-2.86C5.7 14.29 4.65 9.91 5.95 5.98zm.02-.02l-.01.01c-.38 3.01 1.17 6.88 4.3 10.02l5.73-5.73c-3.13-3.13-7.01-4.68-10.02-4.3z"/>',
    heritageIcon:
      '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>',
  };
  return icons[iconName] || icons.homeIcon;
};

const createCustomIcon = (category: string, color: string) => {
  const iconMap: Record<string, string> = {
    tourism: "beachIcon",
    sports: "peopleIcon",
    transport: "carIcon",
    education: "homeIcon",
    heritage: "heritageIcon",
  };

  const iconName = iconMap[category] || "homeIcon";

  return L.divIcon({
    className: "custom-icon",
    html: `
      <div style="
        position: relative;
        width: 56px;
        height: 56px;
      ">
        <div style="
          background: ${color};
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 16px rgba(0,0,0,0.4);
          border: 4px solid white;
        ">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            ${getIconSVG(iconName)}
          </svg>
        </div>
      </div>
    `,
    iconSize: [56, 56],
    iconAnchor: [28, 28],
    popupAnchor: [0, -28],
  });
};

export default function MapComponent({
  center,
  zoom,
  locations,
}: MapComponentProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  const markers = useMemo(() => {
    return locations.map((location) => {
      const icon = createCustomIcon(location.category, location.color);
      return { location, icon };
    });
  }, [locations]);

  if (!isMounted) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg bg-slate-900/30">
        <div className="text-slate-400">Carregando mapa...</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden rounded-lg">
      <MapContainer
        key={`map-${center[0]}-${center[1]}-${zoom}`}
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
        scrollWheelZoom={true}
        zoomControl={true}
        whenReady={() => {}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        {markers.map(({ location, icon }) => (
          <Marker key={location.id} position={location.coordinates} icon={icon}>
            <Popup>
              <div className="flex flex-col">
                <h3 className="font-semibold">{location.name}</h3>
                <p className="text-xs">{location.description}</p>
                <p className="text-xs text-slate-500">{location.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
