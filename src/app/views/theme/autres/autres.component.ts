import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoleModel } from '../../../models/role.model';
import { SpecialisationModel } from '../../../models/specialisation.model';
import { StructureSanitaireModel } from '../../../models/structureSanitaire.model';
import { AutresService } from './autres.service';
import { ItemsFormulaireComponent } from './components/items-formulaire/items-formulaire.component';
AutresService

@Component({
  selector: 'app-autres',
  templateUrl: './autres.component.html',
  styleUrls: ['./autres.component.scss']
})
export class AutresComponent implements OnInit {
  specialisations : SpecialisationModel[] = [];
  roles : RoleModel[] = [];
  structuresSanitaires : StructureSanitaireModel[] = [];
  displayeRoledColumns: string[] = ['nom', 'code', 'select'];
  displayeSpecialisationColumns: string[] = ['nom', 'code', 'select'];
  displayStructureSanColumn: string[] = ['nom', 'code', 'ville', 'select'];
  constructor(private autresService : AutresService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.unitFunction()
  }

  getSpecialisations(){
    this.autresService.getSpecialisations().subscribe(
      (data) =>{
        this.specialisations = data
      });
  }

  getRoles(){
    this.autresService.getRoles().subscribe(
      (data) =>{
        this.roles = data
      });
  }

  getStructureSanitaire(){
    this.autresService.getStructureSanitaire().subscribe(
      (data) =>{
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

  openDialog(mode: 'edit' | 'see' | 'create', type: 'role' | 'specialisation' | 'structureSanitaire', item?: any) {
    this.matDialog.open(ItemsFormulaireComponent, {
      data: { item, mode, type },
      width: '450px'
    });
  }
}
