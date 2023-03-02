// src/components/GeoMap.jsx
import { useEffect, useRef } from "react";

export function GeoMap() {
    const mapRef = useRef();

    async function loadMap(container) {
        const { initialize } = await import("../data/mapping");
        initialize(container);
    }

    useEffect(() => {
        if (mapRef.current) {
            loadMap(mapRef.current);
        }
    }, [mapRef]);

    return (
        <div className="h-full w-full" ref={mapRef}></div>
    );
}
