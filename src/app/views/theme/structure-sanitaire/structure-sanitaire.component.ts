import { Component, OnInit } from '@angular/core';
import { StructureSanitaireService } from './structure-sanitaire-service/structure-sanitaire.service';

@Component({
  selector: 'app-structure-sanitaire',
  templateUrl: './structure-sanitaire.component.html',
  styleUrls: ['./structure-sanitaire.component.scss']
})
export class StructureSanitaireComponent implements OnInit {
  structureSanitaires : any
  p: number = 1;
  pagelimit: number = 3;
  totalStructures : number
  structures = [{"icon":"fa fa-hospital","type":"Hôpital","count":0},{"icon":"fa fa-capsule","type":"Pharmacie","count":0},{"icon":"fa fa-clinic-medical","type":"Dispensaire","count":0},{"icon":"fa fa-hospital","type":"Poste de santé","count":0}]
  constructor(private structureSanitaireService : StructureSanitaireService) { }

  ngOnInit(): void {
    this.getAllStructuresSanitaires(this.pagelimit,0)
    this.countStructures()
    this.countStructureByStatus()
  }

  getAllStructuresSanitaires(limit,skip){
    this.structureSanitaireService.getStructureSanitairePagination(limit,skip).subscribe(
      (res) =>{
        console.log(res)
        this.structureSanitaires = res
      },
      (err) =>{
        console.log(err)
      }
    )
  }

  getPage(event){
    this.p=event
    var skip=(event-1)*this.pagelimit
    this.getAllStructuresSanitaires(this.pagelimit,skip)
  }

  countStructures(){
    this.structureSanitaireService.CountStructure().subscribe(
      (res) => {
        console.log(res.count)
        this.totalStructures = res.count
      },
      (err) => {
        console.log(err)
      }
    )
  }

  countStructureByStatus(){
    for (var struct of this.structures){
      console.log(struct)
      this.structureSanitaireService.countStructureSanitaireByType(struct.type).subscribe(
        (res) => {
          struct["count"] = res.count
          console.log(struct)
        },
        (err) => {
          console.log(err)
        }
      )
    }
  }

}
