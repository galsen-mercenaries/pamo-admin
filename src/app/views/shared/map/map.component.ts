import { Component, OnInit, Inject } from "@angular/core";
import * as mapboxgl from "mapbox-gl";
import { environment } from "../../../../environments/environment";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = "mapbox://styles/mapbox/streets-v11";
  lat = 14.751523;
  lng = -17.45677;
  selectedLat: number;
  selectedLng: number;
  result: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { lat: number; lnt: number },
    private matDialog: MatDialogRef<MapComponent>
  ) {}

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: "map",
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl({ showZoom: true }));
    this.map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );
    this.createMarker(this.data.lnt, this.data.lat);
  }

  initializeMap() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: "map",
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
    });

    this.map.addControl(new mapboxgl.NavigationControl({ showZoom: true }));
    this.map.addControl(
      new MapboxGeocoder({
        accesToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );
    this.createMarker(this.lng, this.lat);
  }

  createMarker(long, lat) {
    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([long, lat])
      .addTo(this.map);

    marker.on("dragend", () => {
      this.selectedLat = marker.getLngLat().lat;
      this.selectedLng = marker.getLngLat().lng;
      this.result = marker.getLngLat();
    });
  }

  close(result?: any) {
    this.matDialog.close(result);
  }
}
