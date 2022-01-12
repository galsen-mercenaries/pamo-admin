import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { SharedService } from "../../../../shared/shared.service";
import { PrestataireService } from "../../prestataire-service/prestataire.service";
import { environment } from "../../../../../../environments/environment";
import * as mapboxgl from "mapbox-gl";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MapComponent } from "../../../../shared/map/map.component";

@Component({
  selector: "app-add-prestataire",
  templateUrl: "./add-prestataire.component.html",
  styleUrls: ["./add-prestataire.component.scss"],
})
export class AddPrestataireComponent implements OnInit {
  id;
  map: mapboxgl.Map;
  mode : string = "post"
  style = "mapbox://styles/mapbox/streets-v11";
  lat  : number
  lng  : number;
  selectedOption;
  occurencesList: string[] = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  selectedLat: number;
  selectedLng: number;
  prestataireForm = this.formBuilder.group({
    nom: "",
    libelle: "",
    numero: "",
    adresse: "",
    latitude: 0,
    longitude: 0,
    status: false,
  });
  constructor(
    private formBuilder: FormBuilder,
    private prestataireService: PrestataireService,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { item: any }
  ) {}

  ngOnInit(): void {
    this.lat = environment.lat
    this.lng = environment.lng
    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      this.mode = "update"
      this.getPrestataireById(this.id);
      console.log(this.lat,this.lng)
    }
    //this.initializeMap()
  }

  
  onSubmit() {
    console.log(this.mode)
    if ((this.mode == "post")) {
      var data = this.prestataireForm.value;
      this.prestataireService.addPrestataire(data).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(["/theme/prestataire"]);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      var data : any
      data = this.prestataireForm.value;
      //data["prestataireId"]=this.id
      this.prestataireService.updatePrestataire(data,this.id).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(["/theme/prestataire"]);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  changePrestataire(value) {
    console.log(this.selectedOption);
  }

  showMap() {
    const matDialogRef = this.matDialog.open(MapComponent, {
      width: "90%",
      height: "60%",
      data: { lat: this.lat, lnt: this.lng },
    });

    matDialogRef
      .afterClosed()
      .subscribe((res: { lng: number; lat: number }) => {
        if (res) {
          this.prestataireForm.patchValue({ latitude: res?.lat });
          this.prestataireForm.patchValue({ longitude: res?.lng });
        }
      });
  }

  getPrestataireById(id) {
    this.prestataireService.getPrestataireById(id).subscribe((res) => {
      this.prestataireForm.patchValue(res);
      this.lat = res.latitude
      this.lng = res.longitude
    });
  }
}
