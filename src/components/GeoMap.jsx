import { useEffect, useRef } from "react";

async function loadMap(container) {
    const { initialize } = await import("../data/mapping");
    initialize(container);
}

export function GeoMap() {
    const mapRef = useRef();

    useEffect(() => {
       if (mapRef.current) {
           loadMap(mapRef.current);
       } 
    }, [mapRef]);

    return (
        <div className="h-full w-full" ref={mapRef}></div>
    );
}
