"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGraphMode } from "../provider/GraphModeContext";


const LineGraph = dynamic(() => import("./LineGraph"), {
    ssr: true,
});
const Heatmap = dynamic(() => import("./Heatmap"), {
    ssr: true,
});
const TripMap = dynamic(() => import("./TripMap"), {
    ssr: true,
});
const DockMap = dynamic(() => import("./DockMap"), {
    ssr: true,
});


export const GraphObjects = [
    { name: "Total Trips Over Time 🕗", component: <LineGraph /> },
    { name: "Daily Trip 🔥 Heatmap", component: <Heatmap /> },
    { name: "🏆 Top 30 Trips", component: <TripMap /> },
    { name: "🗺️ Station Map", component: <DockMap /> }
];

export const Modes = [
    { name: "Explore 👨‍🔬", url: "explore" },
    { name: "Covid 🦠", url: "covid" },
];

export default function CitibikeDeepDive() {
    const [expanded, setExpanded] = useState(GraphObjects.map(() => true));
    const searchParams = useSearchParams();
    const router = useRouter();

    const allowedModes = Modes.map((m) => m.url);

    const { graphMode, setGraphMode } = useGraphMode();

    useEffect(() => {
        const modeFromURL = searchParams.get("mode");
        if (allowedModes.includes(modeFromURL)) {
            setGraphMode(modeFromURL);
        } else {
            setGraphMode("explore");
            router.replace(`?mode=explore`);
        }
    }, [searchParams, router, allowedModes, setGraphMode]);

    const toggleExpand = (index) => {
        setExpanded((prev) => {
            const newExpanded = [...prev];
            newExpanded[index] = !newExpanded[index];
            return newExpanded;
        });
    };

    const handleTabChange = (newMode) => {
        router.push(`?mode=${newMode}`);
    };

    return (
        <div>
            <div className="flex justify-center m-2">
                <Tabs value={graphMode} onValueChange={handleTabChange}>
                    <TabsList className="h-7">
                        {Modes.map((mode) => (
                            <TabsTrigger key={mode.url} className="h-5" value={mode.url}>
                                {mode.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
            <div>
                {GraphObjects.map((object, index) => (
                    <div key={index} className="w-full h-full border rounded-lg shadow-sm overflow-scroll mb-3">
                        <h2
                            className={`text-xl font-semibold text-center p-3 cursor-pointer flex items-center justify-center gap-2 ${expanded[index] ? "bg-gray-100" : "hover:bg-gray-100"
                                }`}
                            onClick={() => toggleExpand(index)}
                        >
                            {object.name}
                            {expanded[index] ? (
                                <ChevronUp className="h-5 w-5" />
                            ) : (
                                <ChevronDown className="h-5 w-5" />
                            )}
                        </h2>
                        {expanded[index] && (
                            <div className="p-4 h-full">
                                <Suspense>
                                    {object.component}
                                </Suspense>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
