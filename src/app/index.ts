import { circleMarker } from 'leaflet';
import { BasicWorldMapBundled } from '..';

window.customElements.define('basic-world-map', BasicWorldMapBundled);

const basicMap = document.createElement(
	'basic-world-map'
) as BasicWorldMapBundled;

import('leaflet/dist/leaflet.css').then(data => {
	const sheet = new CSSStyleSheet();
	sheet.replaceSync(data.default);
	basicMap.setCss(sheet);
});

import('../geodata.json').then(data => {
	basicMap.setGeoJson(data.default);
	const maldivesLatLng = basicMap.countryFeatures.get('Maldives').getCenter();

	const maldivesMarker = circleMarker(maldivesLatLng, {
		weight: 1
	});
	maldivesMarker.bindTooltip('Maldives');

	maldivesMarker
		.addTo(basicMap.leafletMap)
		.getElement()
		?.setAttribute('tabindex', '-1');
});

basicMap.highlight = [
	'Afghanistan',
	'Armenia',
	'Azerbaijan',
	'Bangladesh',
	'Belarus',
	'Burkina Faso',
	'Burma',
	'Burundi',
	'Cambodia',
	'Colombia',
	"Cote d'Ivoire",
	'Democratic Republic of the Congo',
	'Djibouti',
	'Egypt',
	'El Salvador',
	'Ethiopia',
	'Georgia',
	'Ghana',
	'Guatemala',
	'Guinea',
	'Haiti',
	'Honduras',
	'India',
	'Indonesia',
	'Iraq',
	'Jordan',
	'Kenya',
	'Kosovo',
	'Kyrgyz Republic',
	'Laos',
	'Lebanon',
	'Liberia',
	'Malawi',
	'Maldives',
	'Mauritania',
	'Moldova',
	'Morocco',
	'Mozambique',
	'Nepal',
	'Nicaragua',
	'Niger',
	'Nigeria',
	'Philippines',
	'Rwanda',
	'Senegal',
	'Somalia',
	'South Africa',
	'South Sudan',
	'Sri Lanka',
	'Tajikistan',
	'Thailand',
	'Timor-Leste',
	'Uganda',
	'Ukraine',
	'Uzbekistan'
];

basicMap.style.visibility = 'hidden';
document.body.replaceChildren(basicMap);

setTimeout(() => {
	basicMap.countryFeatures
		.get('Western Sahara')
		.getElement()
		.classList.add('bwm-highlight');

	basicMap.style.visibility = 'visible';
}, 0);
