import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-prestataire',
  templateUrl: './prestataire.component.html',
  styleUrls: ['./prestataire.component.scss']
})
export class PrestataireComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 14.751523;
  lng = -17.45677;
  occurencesList = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  
  constructor() { }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.createMarker(this.lng,this.lat)
  }

  createMarker(long,lat){
    const marker = new mapboxgl.Marker({
      draggable: true
    })
    .setLngLat([long,lat])
    .addTo(this.map)

    marker.on('drag',()=>{
      console.log(marker.getLngLat())
    })
  }

}
