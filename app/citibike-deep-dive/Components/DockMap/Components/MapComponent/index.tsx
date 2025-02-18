"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from 'lucide-react';

const MapSection = dynamic(() => import("./MapSection"), {
    ssr: false,
});
const ClickPopup = dynamic(() => import("../MapComponent/ClickPopup"), {
    ssr: false,
});

function MapComponent({ MapData, SliderYear, SliderMonth }) {
    const [ClickInfo, setClickInfo] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [MapLayers, setMapLayers] = useState([]);

    const handleSetClickInfo = (info) => {
        setClickInfo(info);
        setSidebarOpen(!!info);
    };

    return (
        <div className="relative h-[34em] w-full overflow-hidden">
            <MapSection
                SliderYear={SliderYear}
                SliderMonth={SliderMonth}
                MapData={MapData}
                MapLayers={MapLayers}
                setMapLayers={setMapLayers}
                ClickInfo={ClickInfo}
                setClickInfo={handleSetClickInfo}
            />
            <Button
                disabled={!ClickInfo}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`absolute top-1/2 -translate-y-1/2 rounded-none rounded-l-sm transition-all duration-300 bg-gray-400 hover:bg-gray-300 h-12 w-5 z-10 disabled:opacity-50 disabled:cursor-not-allowed ${sidebarOpen ? "right-[19em]" : "right-0"}`}
            >
                {sidebarOpen ? <ChevronRight /> : <ChevronLeft />}
            </Button>
            <div
                className={
                    `absolute p-3 top-0 right-0 h-[34em] w-[16.7em] bg-white/90 shadow-lg transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {ClickInfo && (
                    <ClickPopup
                        ClickInfo={ClickInfo}
                        SliderYear={SliderYear}
                        SliderMonth={SliderMonth}
                        setClickInfo={handleSetClickInfo}
                    />
                )}
            </div>
        </div>
    );
}

export default MapComponent;