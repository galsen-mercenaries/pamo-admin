import { Component, OnInit } from "@angular/core";
import { environment } from "../../../../environments/environment";
import * as mapboxgl from "mapbox-gl";
import { PrestataireService } from "./prestataire-service/prestataire.service";
import { MatDialog } from "@angular/material/dialog";
import { DeletePrestataireComponent } from "./components/delete-prestataire/delete-prestataire.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AddPrestataireStructureComponent } from "./components/add-prestataire-structure/add-prestataire-structure.component";
import { url } from "inspector";

@Component({
  selector: "app-prestataire",
  templateUrl: "./prestataire.component.html",
  styleUrls: ["./prestataire.component.scss"],
})
export class PrestataireComponent implements OnInit {
  id;
  prestataires: [];
  totalPresttaires: number;
  map: mapboxgl.Map;
  style = "mapbox://styles/mapbox/streets-v11";
  lat = 14.751523;
  lng = -17.45677;
  occurencesList = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  p: number = 1;
  pagelimit: number = 6;

  constructor(
    private prestataireService: PrestataireService,
    private matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log(this.id);
    this.getPrestataires(this.pagelimit, 0);
  }

  getPrestataires(limit, skip) {
    this.prestataireService.getPrestatairePagination(limit, skip).subscribe(
      (res) => {
        console.log(res);
        this.prestataires = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getPage(event) {
    console.log(event);
  }

  detailPrestataire(prestataire) { 
    const url = "theme/prestataire/structure-sanitaire/"+prestataire.prestataireId
    this.router.navigate([url])
  }

  editPrestataire(prestataire) {
    const url = "theme/prestataire/edit/" + prestataire.prestataireId;
    this.router.navigate([url]);
    console.log(prestataire);
  }

  deletePrestataire(prestataire) {
    const matDialogRef = this.matDialog.open(DeletePrestataireComponent, {
      data: { prestataire },
      width: "450px",
    });

    matDialogRef.afterClosed().subscribe((res: { success: boolean }) => {
      if (res && res.success) {
        this.getPrestataires(this.pagelimit, 0);
      }
    });
    console.log(prestataire);
  }

  
}
