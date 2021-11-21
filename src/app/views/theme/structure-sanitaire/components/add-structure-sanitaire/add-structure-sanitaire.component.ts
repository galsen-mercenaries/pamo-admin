import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { SharedService } from '../../../../shared/shared.service';
import { StructureSanitaireService } from '../../structure-sanitaire-service/structure-sanitaire.service';
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-add-structure-sanitaire',
  templateUrl: './add-structure-sanitaire.component.html',
  styleUrls: ['./add-structure-sanitaire.component.scss']
})
export class AddStructureSanitaireComponent implements OnInit {

  map: mapboxgl.Map;

  selectedOption;

  structureSanitaireForm = this.formBuilder.group({
    nom: "",
    ville: "",
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

  selectedLat : number
  
  selectedLng : number
  occurencesList

  constructor(private formBuilder : FormBuilder, private sharedService : SharedService, private structureSanitaireService : StructureSanitaireService) { }

  ngOnInit(): void {
    this.occurencesList = environment.occurencesList;

    this.initializeMap()
  }

  initializeMap(){
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: environment.style,
        zoom: 13,
        center: [environment.lng, environment.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.createMarker(environment.lng,environment.lat)
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
    var data = this.structureSanitaireForm.value
    data['watch_periodicity_value'] = data['watch_periodicity_value'].toString()
    data['latitude'] = this.selectedLat
    data['longitude'] = this.selectedLng

    if (this.selectedOption == "occurency"){
      delete data['watch_start_date']
      delete data['watch_end_date']
    }
    else{
      delete data["watch_periodicity_value"]
    }
    console.log(data)
    console.log(data.watch_periodicity_value.toString())
    data['code'] = this.sharedService.generateString(data["nom"])
    this.structureSanitaireService.addStructureSanitaire(data).subscribe(
      (res) => {
        console.log(res)
      },
      (err) =>{
        console.log(err)
      }
    )
  }

  changePrestataire(event){}
}
