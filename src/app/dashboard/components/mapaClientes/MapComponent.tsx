"use client";

import { useEffect, useRef, useState } from "react";
import { Location } from "@/services/map.service";

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  locations: Location[];
}

declare global {
  interface Window {
    mapboxgl: any;
  }
}

const getIconSVG = (iconName: string, color: string): string => {
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

  const iconPath = icons[iconName] || icons.homeIcon;

  return `
    <svg width="56" height="56" viewBox="0 0 56 56">
      <circle cx="28" cy="28" r="24" fill="${color}" stroke="white" stroke-width="4" filter="drop-shadow(0px 4px 8px rgba(0,0,0,0.4))"/>
      <svg x="14" y="14" width="28" height="28" viewBox="0 0 24 24" fill="white">
        ${iconPath}
      </svg>
    </svg>
  `;
};

const getIconName = (category: string): string => {
  const iconMap: Record<string, string> = {
    tourism: "beachIcon",
    sports: "peopleIcon",
    transport: "carIcon",
    education: "homeIcon",
    heritage: "heritageIcon",
  };
  return iconMap[category] || "homeIcon";
};

export default function MapComponent({
  center,
  zoom,
  locations,
}: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.mapboxgl) return;
    if (!mapContainer.current || map.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      console.error("Mapbox, token não encontrado");
      return;
    }

    window.mapboxgl.accessToken = token;

    map.current = new window.mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [center[1], center[0]],
      zoom: zoom - 1,
    });

    map.current.addControl(new window.mapboxgl.NavigationControl(), "top-right");
    setIsMounted(true);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [center, zoom]);

  useEffect(() => {
    if (!map.current || !isMounted || typeof window === "undefined" || !window.mapboxgl) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    locations.forEach((location) => {
      const iconName = getIconName(location.category);
      const iconSVG = getIconSVG(iconName, location.color);

      const el = document.createElement("div");
      el.innerHTML = iconSVG;
      el.style.cursor = "pointer";
      el.style.width = "56px";
      el.style.height = "56px";

      const popup = new window.mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 8px; min-width: 200px;">
          <h3 style="font-weight: 600; margin-bottom: 4px; color: #1e293b;">${location.name}</h3>
          <p style="font-size: 12px; margin-bottom: 2px; color: #475569;">${location.description}</p>
          <p style="font-size: 12px; color: #94a3b8;">${location.address}</p>
        </div>
      `);

      const marker = new window.mapboxgl.Marker(el)
        .setLngLat([location.coordinates[1], location.coordinates[0]])
        .setPopup(popup)
        .addTo(map.current);

      markersRef.current.push(marker);
    });

    if (locations.length > 0 && window.mapboxgl.LngLatBounds) {
      const bounds = new window.mapboxgl.LngLatBounds();
      locations.forEach((location) => {
        bounds.extend([location.coordinates[1], location.coordinates[0]]);
      });
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 15 });
    }
  }, [locations, isMounted]);

  if (typeof window === "undefined" || !window.mapboxgl) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg bg-slate-900/30">
        <div className="text-(--text-secondary-color)">Carregando mapa...</div>
      </div>
    );
  }
  return (
    <div
      ref={mapContainer}
      className="h-full w-full overflow-hidden rounded-lg"
      style={{ minHeight: "300px" }}
    />
  );
}
