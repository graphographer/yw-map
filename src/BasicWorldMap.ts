import {
	FeatureGroup,
	Map as LeafletMap,
	featureGroup,
	geoJSON,
	map,
	tooltip
} from 'leaflet';
import leafletCss from 'leaflet/dist/leaflet.css';
import { LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators/property.js';
import geodata from './geodata.json';

export class BasicWorldMap extends LitElement {
	countryFeatures!: Map<string, any>;
	private geoJson!: ReturnType<typeof geoJSON>;
	leafletMap!: LeafletMap;
	private mapEl = document.createElement('div');

	static styles = [
		css`
			${unsafeCSS(leafletCss.toString())}
			:host {
				display: block;
				height: 500px;
				width: auto;
				margin-bottom: 20px;
			}
			.leaflet-container {
				background-color: #f4f4f4;
				font-family: 'Source Sans Pro', sans-serif;
				font-size: 16px;
				height: 100%;
			}

			.leaflet-attribution-flag {
				display: none !important;
			}

			.sr-only {
				clip: rect(1px, 1px, 1px, 1px);
				clip-path: inset(50%);
				height: 1px;
				width: 1px;
				margin: -1px;
				overflow: hidden;
				padding: 0;
				position: absolute;
			}
		`
	];

	@property({
		type: Array,
		converter(value, type) {
			return value?.split(',');
		}
	})
	highlight: string[];

	constructor() {
		super();
		this.highlight = [];
		this.countryFeatures = new Map();
		this.leafletMap = map(this.mapEl, {
			attributionControl: false,
			// zoomControl: false,
			// dragging: false,
			zoomSnap: 0.5
		}).addEventListener('resize', this.onResize.bind(this));

		// geojson
		this.geoJson = geoJSON(geodata as any, {
			onEachFeature: (feature, layer) => {
				const {
					properties: { SOVEREIGNT: country, ADM0_A3_US: id }
				} = feature;
				this.countryFeatures.set(id as string, layer);
				this.countryFeatures.set(country, layer);
			},
			style() {
				return {
					color: '#fff',
					fillColor: '#CFCDC9',
					fillOpacity: 1,
					opacity: 0.5,
					weight: 1,
					className: 'map-countries'
				};
			}
		}).addTo(this.leafletMap);
	}

	get mismatched() {
		if (!this.highlight.length) return;
		const countryNames = [...this.countryFeatures.keys()];
		return this.highlight.filter(
			countryName => !countryNames.includes(countryName)
		);
	}

	async firstUpdated() {
		this.leafletMap.setView([0, 0], 2);

		const tt = tooltip();
		this.geoJson.on({
			mouseover: e => {
				this.dispatchEvent(
					new CustomEvent('mouseover-country', {
						bubbles: true,
						composed: true,
						detail: e.propagatedFrom
					})
				);

				const {
					feature: {
						properties: { SOVEREIGNT: countryName, ADM0_A3_US: countryId }
					}
				} = e.propagatedFrom;

				if (
					this.highlight.find(country => {
						return country === countryId || country === countryName;
					})
				) {
					tt.setContent(countryName)
						.setLatLng(e.propagatedFrom.getCenter())
						.addTo(this.leafletMap);
				}
			},
			mouseout: e => {
				this.dispatchEvent(
					new CustomEvent('mouseout-country', {
						bubbles: true,
						composed: true,
						detail: e.propagatedFrom
					})
				);
				tt.removeFrom(this.leafletMap);
			},
			click: e => {
				this.dispatchEvent(
					new CustomEvent('click-country', {
						bubbles: true,
						composed: true,
						detail: e.propagatedFrom
					})
				);
			}
		});
	}

	protected updated(
		_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): void {
		if (_changedProperties.has('highlight')) {
			_changedProperties.get('highlight')?.forEach((country: string) => {
				this.countryFeatures.get(country)?.setStyle({ fillColor: '#CFCDC9' });
			});
			if (this.highlight.length) {
				const countriesFg = featureGroup(this.countries);
				countriesFg.setStyle({ fillColor: '#0067B9' });
				this.leafletMap.fitBounds(countriesFg.getBounds());
			} else {
				this.leafletMap.setView([0, 0], 2);
			}
			this.requestUpdate();
		}
	}

	private get countries() {
		return this.highlight
			?.map((country: string) => this.countryFeatures.get(country))
			.filter(Boolean);
	}

	// get mismatchedCountries() {}

	private onResize() {
		if (!this.countries.length) return;

		const countriesFg = featureGroup(this.countries);
		this.leafletMap.fitBounds(countriesFg.getBounds());
	}

	render() {
		return html`
			${this.mapEl}
			<div class="sr-only">
				<h2>Highlighted Countries</h2>
				<ul>
					${this.countries
						.map(country => country.feature.properties.SOVEREIGNT)
						.sort()
						.map(country => html`<li>${country}</li>`)}
				</ul>
			</div>
		`;
	}
}
