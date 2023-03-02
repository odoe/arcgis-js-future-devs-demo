import WebMap from "@arcgis/core/WebMap";
import Graphic from "@arcgis/core/Graphic";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";
import Feature from "@arcgis/core/widgets/Feature";
import Collection from "@arcgis/core/core/Collection";
import { watch } from "@arcgis/core/core/reactiveUtils";
import { debounce, isAbortError } from "@arcgis/core/core/promiseUtils";

const app = new Collection();

watch(
	() => app.toArray(),
	([view, graphic, feature]) => {
		if (feature && !feature.view) {
			feature.graphic = graphic;
			feature.view = view;
			feature.map = view.map;
		}
	}
);

export async function initialize(container) {
	if (app.length) {
		return;
	}

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

	const graphic = new Graphic({
		popupTemplate: {
			content: "Mouse over features to show details...",
		},
	});

	app.addMany([view, graphic]);

	const layerView = await view.whenLayerView(layer);
	let highlight;
	let objectId;

	const debouncedUpdate = debounce(async (event) => {
		const { results } = await view.hitTest(event);
		console.log(results);
		let feature = app.getItemAt(2);
		if (!feature) {
			return;
		}

		const graphics = results.filter((result) => {
			return result.graphic.layer.popupTemplate;
		});

		const result = graphics[0];
		const newObjectId =
			result && result.graphic.attributes[layer.objectIdField];

		if (!newObjectId) {
			highlight && highlight.remove();
			objectId = feature.graphic = null;
		} else if (objectId !== newObjectId) {
			highlight && highlight.remove();
			objectId = newObjectId;
			feature.graphic = result.graphic;
			highlight = layerView.highlight(result.graphic);
		}
	});

	view.on("pointer-move", (event) => {
		debouncedUpdate(event).catch((err) => {
			if (!isAbortError(err)) {
				throw err;
			}
		});
	});
}

export async function initFeature(container) {
	const feature = new Feature({ container });
	app.add(feature);
}
