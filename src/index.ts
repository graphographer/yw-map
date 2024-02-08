import { circleMarker } from 'leaflet';
import { BasicWorldMap } from './BasicWorldMap.js';

window.customElements.define('basic-world-map', BasicWorldMap);

const basicMap = document.createElement('basic-world-map') as BasicWorldMap;
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

document.body.replaceChildren(basicMap);

setTimeout(() => {
	const maldivesLatLng = basicMap.countryFeatures.get('Maldives').getCenter();

	const maldivesMarker = circleMarker(maldivesLatLng, { weight: 1 });
	maldivesMarker.bindTooltip('Maldives');

	maldivesMarker.addTo(basicMap.leafletMap);
}, 0);
