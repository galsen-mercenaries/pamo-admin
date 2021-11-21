import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../../../environments/environment';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

@Component({
    selector: 'app-display-map',
    templateUrl: './display-map.component.html',
    styleUrls: ['./display-map.component.scss']
})
export class DisplayMapComponent implements OnInit {
    map: mapboxgl.Map;
    style = 'mapbox://styles/mapbox/streets-v11';
    lat = this?.data?.lat ? this?.data?.lat : 14.751523;
    lng = this?.data?.lnt ? this?.data?.lnt : -17.45677;
    result: any;
    constructor(@Inject(MAT_DIALOG_DATA) public data: {lat: number; lnt: number}, private matDialog: MatDialogRef<DisplayMapComponent>) {}

    ngOnInit(): void {
      console.log('this?.data', this?.data);

        (mapboxgl as any).accessToken = environment.mapbox.accessToken;
        this.map = new mapboxgl.Map({
            container: 'map',
            style: this.style,
            zoom: 13,
            center: [this.lng, this.lat]
        });
        // Add map controls
        this.map.addControl(new mapboxgl.NavigationControl({showZoom: true}));
        this.map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            })
        );
        this.createMarker(this.lng, this.lat);
    }

    createMarker(long, lat) {
        const marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([long, lat])
            .addTo(this.map);

        marker.on('dragend', () => {
            console.log(marker.getLngLat());
            this.result = marker.getLngLat();
        });
    }

    close(result?: any) {
        this.matDialog.close(result);
    }
}
