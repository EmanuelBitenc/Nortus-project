"use client";

import SelectMap from "@/components/select";
import { useMapData } from "@/hooks/useMap";
import dynamic from "next/dynamic";
import { useState } from "react";

const MapComponent = dynamic(() => import("./MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="flex h-64 items-center justify-center rounded-lg bg-slate-900/30 text-(--text-secondary-color)">
            <p>Carregando mapa...</p>
        </div>
    ),
});

export default function MapaClientes() {
    const { data: mapData, isLoading, error } = useMapData();
    const [selectedLocation, setSelectedLocation] = useState<string>("all");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    if (isLoading) {
        return (
            <div className="card-board col-span-1 lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                        Mapa de clientes por região
                    </h3>
                </div>
                <div className="flex h-64 items-center justify-center rounded-lg bg-slate-900/30 text-(--text-secondary-color)">
                    <p>Carregando mapa...</p>
                </div>
            </div>
        );
    }

    if (error || !mapData) {
        return (
            <div className="card-board col-span-1 lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                        Mapa de clientes por região
                    </h3>
                </div>
                <div className="flex h-64 items-center justify-center rounded-lg bg-slate-900/30 text-red-400">
                    <p>Erro ao carregar mapa</p>
                </div>
            </div>
        );
    }

    const filteredLocations = mapData.locations.filter((location) => {
        const matchesLocation =
            selectedLocation === "all" || location.name === selectedLocation;
        const matchesCategory =
            selectedCategory === "all" || location.category === selectedCategory;
        return matchesLocation && matchesCategory;
    });

    // Obter localizações únicas
    const uniqueLocations = Array.from(
        new Set(mapData.locations.map((l) => l.name))
    );

    // Obter categorias únicas
    const uniqueCategories = Array.from(
        new Set(mapData.locations.map((l) => l.category))
    );

    const categoryNames: Record<string, string> = {
        tourism: "Turismo",
        sports: "Esportes",
        transport: "Transporte",
        education: "Educação",
        heritage: "Patrimônio",
    };

    return (
        <div className="card-board col-span-1 lg:col-span-2">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <h3 className="text-base font-semibold text-white sm:text-lg">
                    Mapa de clientes por região
                </h3>
                <div className="flex flex-wrap gap-2">
                    <SelectMap
                        value={selectedLocation}
                        change={setSelectedLocation}
                        datas={uniqueLocations}
                        label="Todos os locais"
                    />
                    <SelectMap
                        value={selectedCategory}
                        change={setSelectedCategory}
                        datas={uniqueCategories}
                        categoryNames={categoryNames}
                        label="Todos os tipos"
                    />
                </div>
            </div>
            <div className="h-64 sm:h-72 lg:h-80">
                <MapComponent
                    key={`map-${selectedLocation}-${selectedCategory}-${filteredLocations.length}`}
                    center={mapData.center}
                    zoom={mapData.zoom}
                    locations={filteredLocations}
                />
            </div>
        </div>
    );
}
