import { useEffect, useRef } from "react";

async function loadWidget(container) {
    const { initFeature } = await import("../data/mapping");
    initFeature(container);
}

export function SidePanel() {
    const panelRef = useRef();

    useEffect(() => {
        if (panelRef.current) {
            loadWidget(panelRef.current)
        }
    }, [panelRef]);

    return (
        <aside className="w-4/12">
            <div className="w-full" ref={panelRef}></div>
        </aside>
    );
}
