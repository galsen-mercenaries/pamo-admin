import { Component, OnInit } from "@angular/core";
import { StructureSanitaireService } from "./structure-sanitaire-service/structure-sanitaire.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, forkJoin } from "rxjs";

@Component({
  selector: "app-structure-sanitaire",
  templateUrl: "./structure-sanitaire.component.html",
  styleUrls: ["./structure-sanitaire.component.scss"],
})
export class StructureSanitaireComponent implements OnInit {
  structureStatus;
  structureSanitaires: any;
  p: number = 1;
  pagelimit: number = 3;
  totalStructures: number;
  structuresCount : any;
  typePrestataire : any
  structures = [
    { icon: "fa fa-hospital", type: "Hôpital", count: 0 },
    { icon: "fa fa-capsule", type: "Pharmacie", count: 0 },
    { icon: "fa fa-clinic-medical", type: "Dispensaire", count: 0 },
    { icon: "fa fa-hospital", type: "Poste de santé", count: 0 },
  ];
  constructor(
    private structureSanitaireService: StructureSanitaireService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllStructuresSanitaires(this.pagelimit, 0);
    this.countStructures();
    this.countStructureByStatus();
  }

  getAllStructuresSanitaires(limit, skip) {
    this.structureSanitaireService
      .getStructureSanitairePagination(limit, skip)
      .subscribe(
        (res) => {
          console.log(res);
          this.structureSanitaires = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getPage(event) {
    this.p = event;
    var skip = (event - 1) * this.pagelimit;
    this.getAllStructuresSanitaires(this.pagelimit, skip);
  }

  countStructures() {
    this.structureSanitaireService.CountStructure().subscribe(
      (res) => {
        console.log(res.count);
        this.totalStructures = res.count;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  countStructureByStatus() {
    let observables: Observable<any>[] = [];
    for (var struct of this.structures) {
      observables.push(
        this.structureSanitaireService.countStructureSanitaireByType(
          struct.type
        )
      );
    }
    forkJoin(observables).subscribe(
      (res) => {
        this.structuresCount = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectStructureType() {
    this.structureSanitaireService.getStructureSanitairePagination(this.pagelimit,0,this.typePrestataire).subscribe(
      (res) =>{
        console.log(res)
        this.structureSanitaires = res
      },
      (err) =>{
        console.log(err)
      }
    )
  }

  editStructureSanitaire(structure) {
    const url ="theme/structure-sanitaire/edit/" + structure.structuresanitaireId;
    this.router.navigate([url]);
  }

  openDialogUser(structure: any, type: string) {}
  deactiveUser(structure: any) {}
}
