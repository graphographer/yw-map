import { circleMarker } from 'leaflet';
import { BasicWorldMapBundled } from './BasicWorldMapBundled';
import { customElement } from 'lit/decorators/custom-element.js';

@customElement('yw-map')
class YWMap extends BasicWorldMapBundled {
	highlight = [
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

	firstUpdated() {
		super.firstUpdated();

		const maldivesLatLng = this.countryFeatures.get('Maldives').getCenter();

		const maldivesMarker = circleMarker(maldivesLatLng, {
			weight: 1
		});
		maldivesMarker.bindTooltip('Maldives');

		maldivesMarker
			.addTo(this.leafletMap)
			.getElement()
			?.setAttribute('tabindex', '-1');

		this.countryFeatures
			.get('Western Sahara')
			.getElement()
			.classList.add('bwm-highlight');
	}
}
