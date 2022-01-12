import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { StructureSanitaireService } from '../../../structure-sanitaire/structure-sanitaire-service/structure-sanitaire.service';
import { PrestataireService } from '../../prestataire-service/prestataire.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-prestatraire-structure',
  templateUrl: './prestatraire-structure.component.html',
  styleUrls: ['./prestatraire-structure.component.scss']
})
export class PrestatraireStructureComponent implements OnInit {

  structures : any
  prestataire : any
  id
  totalStructures
  p: number = 1;
  pagelimit: number = 2;
  constructor(
    private structureSanitaireService : StructureSanitaireService,
    private prestataireservice : PrestataireService,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"]
    this.getStructureSanitaireByPrestatireId(this.id,this.pagelimit,0)
    this.getPrestataireById(this.id)
    this.countStructureSanitaireByPrestatireId(this.id)
  }

  getStructureSanitaireByPrestatireId(prestataireId,limit,skip){
    this.prestataireservice.getStructureSanitaireByPrestataireId(prestataireId,limit,skip).subscribe(
      (res) =>{
        this.structures = res;
        console.log(res)
      },
      (err) =>{
        console.log(err)
      }
    )
  }

  getPrestataireById(prestataireId){
    this.prestataireservice.getPrestataireById(prestataireId).subscribe(
      (res) =>{
        this.prestataire = res
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  getPage(event){
    this.p=event
    var skip=(event-1)*this.pagelimit
    this.getStructureSanitaireByPrestatireId(this.id,this.pagelimit,skip)
  }
  countStructureSanitaireByPrestatireId(prestataireId){
    this.prestataireservice.countStructureSanitaireByPrestataireId(prestataireId).subscribe(
      (res) =>{
        this.totalStructures = res.count;
        console.log(res)
      },
      (err) =>{
        console.log(err)
      }
    )
  }
}
