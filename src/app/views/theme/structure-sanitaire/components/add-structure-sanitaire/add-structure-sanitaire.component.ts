import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { environment } from "../../../../../../environments/environment";
import { SharedService } from "../../../../shared/shared.service";
import { StructureSanitaireService } from "../../structure-sanitaire-service/structure-sanitaire.service";
import * as mapboxgl from "mapbox-gl";
import { MapComponent } from "../../../../shared/map/map.component";
import { Router, ActivatedRoute } from "@angular/router";
import {
  MatDialog,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-add-structure-sanitaire",
  templateUrl: "./add-structure-sanitaire.component.html",
  styleUrls: ["./add-structure-sanitaire.component.scss"],
})
export class AddStructureSanitaireComponent implements OnInit {
  map: mapboxgl.Map;
  id;

  selectedOption;

  structureSanitaireForm = this.formBuilder.group({
    nom: "",
    ville: "",
    typePrestataire: "",
    email: "",
    adresse: "",
    latitude: 0,
    longitude: 0,
    is_actif: Boolean,
    is_all_night: Boolean,
    periodicityType: "",
    watch_start_date: "",
    watch_end_date: "",
    watch_periodicity_value: "",
  });

  lat: number;

  lng: number;
  mode: string = "post";
  occurencesList;
  isSubmitting = false;
  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private structureSanitaireService: StructureSanitaireService,
    private matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { item: any }
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.occurencesList = environment.occurencesList;
    this.lat = environment.lat;
    this.lng = environment.lng;

    if (this.id) {
      this.mode = "update";
      this.getStructureById(this.id);
    }
    //this.initializeMap()
  }

  onSubmit() {
    var data = this.structureSanitaireForm.value;
    data["code"] = this.sharedService.generateString(data["nom"]);
    if (this.selectedOption == "occurency") {
      delete data["watch_start_date"];
      delete data["watch_end_date"];
      data["watch_periodicity_value"] =
        data["watch_periodicity_value"].toString();
    } else {
      delete data["watch_periodicity_value"];
    }
    this.isSubmitting = true;
    if (this.mode == "post") {
      this.structureSanitaireService.addStructureSanitaire(data).pipe(
        finalize(() => {
          this.isSubmitting = false;
        })
      ).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(["/theme/structure-sanitaire"]);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.log("update Methode");
      this.structureSanitaireService
        .updateStructureSanitaire(this.id, data)
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
          })
        )
        .subscribe(
          (res) => {
            console.log(res);
            this.router.navigate(["/theme/structure-sanitaire"]);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  changePrestataire(event) {}

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
          this.structureSanitaireForm.patchValue({ latitude: res?.lat });
          this.structureSanitaireForm.patchValue({ longitude: res?.lng });
        }
      });
  }

  getStructureById(id) {
    this.structureSanitaireService
      .getStructureSanitaireById(id)
      .subscribe((res) => {
        res["watch_periodicity_value"] =
          res["watch_periodicity_value"].split(",");
        this.structureSanitaireForm.patchValue(res);
        console.log(res, "update");
      });
  }
}
