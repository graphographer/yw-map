import leafletCss from 'leaflet/dist/leaflet.css';
import { unsafeCSS } from 'lit';
import { BasicWorldMap } from './BasicWorldMap';
import geodata from './geodata.json';

export class BasicWorldMapBundled extends BasicWorldMap {
	static styles = [unsafeCSS(leafletCss.toString()), ...super.styles];

	constructor() {
		super();

		this.setGeoJson(geodata);
	}
}
