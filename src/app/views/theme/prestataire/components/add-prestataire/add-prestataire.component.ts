import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../../../shared/shared.service';
import { PrestataireService } from '../../prestataire-service/prestataire.service';
import { environment } from '../../../../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-add-prestataire',
  templateUrl: './add-prestataire.component.html',
  styleUrls: ['./add-prestataire.component.scss']
})
export class AddPrestataireComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 14.751523;
  lng = -17.45677;
  selectedOption
  occurencesList: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  selectedLat : number
  selectedLng : number
  prestataireForm = this.formBuilder.group({
    nom: "",
    typePrestataire: "",
    email: "",
    adresse: "",
    is_actif: Boolean,
    is_all_night: Boolean,
    periodicityType: "",
    watch_start_date: "",
    watch_end_date: "",
    watch_periodicity_value: ""
  })
  constructor(private formBuilder : FormBuilder, private prestataireService: PrestataireService) { }

  ngOnInit(): void {
    this.initializeMap()
  }

  initializeMap(){
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
      this.selectedLat = marker.getLngLat().lat
      this.selectedLng = marker.getLngLat().lng
      console.log(marker.getLngLat())
    })
  }

  onSubmit(){
    console.log("Test ajout nouvelle prestataire")
    var data = this.prestataireForm.value
    data['watch_periodicity_value'] = data['watch_periodicity_value'].toString()
    data['latitude'] = this.selectedLat.toString()
    data['longitude'] = this.selectedLng.toString()
    console.log(data)
    console.log(data.watch_periodicity_value.toString())
    this.prestataireService.addPrestataire(data).subscribe(
      (res) => {
        console.log(res)
      },
      (err) =>{
        console.log(err)
      }
    )
  }

  changePrestataire(value){
    console.log(this.selectedOption)
  }

  

}
