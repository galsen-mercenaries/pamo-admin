import { Component, OnInit } from '@angular/core';
import { AutresService } from './autres.service';
AutresService

@Component({
  selector: 'app-autres',
  templateUrl: './autres.component.html',
  styleUrls: ['./autres.component.scss']
})
export class AutresComponent implements OnInit {
  specialisations : any
  roles : any
  structuresSanitaires : any

  constructor(private autresService : AutresService) { }

  ngOnInit(): void {
    this.unitFunction()
  }

  getSpecialisations(){
    this.autresService.getSpecialisations().subscribe(
      (data) =>{
        console.log(data)
        this.specialisations = data
      });
  }

  getRoles(){
    this.autresService.getRoles().subscribe(
      (data) =>{
        console.log(data)
        this.roles = data
      });
  }

  getStructureSanitaire(){
    this.autresService.getStructureSanitaire().subscribe(
      (data) =>{
        console.log(data)
        this.structuresSanitaires = data
      });
  }

  unitFunction(){
    this.getRoles();
    this.getSpecialisations();
    this.getStructureSanitaire();
  }
  deleteRole(code){}
  deleteSpecialisation(code){}
  deleteStructureSanitaire(code){}

}
