import WebMap from "@arcgis/core/WebMap";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";

export async function initialize(container) {
	const layer = new FeatureLayer({
		portalItem: {
			id: import.meta.env.VITE_LAYER_ID,
		},
		layerId: 2,
		outFields: ["*"],
	});
	const webmap = new WebMap({
		portalItem: {
			id: import.meta.env.VITE_WEBMAP_ID,
		},
		layers: [layer],
	});

	const view = new MapView({
		map: webmap,
		container,
		center: [-74, 41.5],
		zoom: 10,
		popup: {
			autoOpenEnabled: false,
		},
	});
}
