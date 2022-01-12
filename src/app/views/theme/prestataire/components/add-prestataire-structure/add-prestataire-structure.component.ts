import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StructureSanitaireService } from '../../../structure-sanitaire/structure-sanitaire-service/structure-sanitaire.service';
import { PrestataireService } from '../../prestataire-service/prestataire.service';
import {FormControl} from '@angular/forms';
import { element } from 'protractor';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';


@Component({
  selector: 'app-prestataire-structure',
  templateUrl: './add-prestataire-structure.component.html',
  styleUrls: ['./add-prestataire-structure.component.scss']
})
export class AddPrestataireStructureComponent implements OnInit {

  allStructures;
  allPrestataires;
  structures;
  prestataires
  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings = {
    singleSelection: false,
    idField: 'structuresanitaireId',
    textField: 'nom',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  dropdownSettings1:IDropdownSettings = {
    singleSelection: true,
    idField: 'prestataireId',
    textField: 'nom',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  prestaStructureForm = this.formBuilder.group({
    prestataire: "",
    structureSanitaire: ""
  });
  structureCtrl = new FormControl();
  @ViewChild('structureInput') structureInput: ElementRef<HTMLInputElement>;

  
  
  constructor(
    private formBuilder : FormBuilder,
    private prestataireService : PrestataireService,
    private structureSanitaireService : StructureSanitaireService,
    private router : Router
  ) { }

  ngOnInit(): void {
    
    this.getPrestataires();
    this.getStructures();
  }

  onSubmit(){
    const data = this.prestaStructureForm.value
    const prestataireId = data.prestataire[0].prestataireId
    const structuresSanitaire = this.formatStructure(data.structureSanitaire)
    console.log(structuresSanitaire)
    this.prestataireService.addStructureToPrestataire(prestataireId, structuresSanitaire).subscribe(
      (res) => {
        this.router.navigate(["/theme/prestataire"]);
        console.log(res)
      },
      (err) =>{
        console.log(err)
      }
    )
  }

  getPrestataires(){
    this.prestataireService.getPrestataire().subscribe(
      (res) => {
        console.log(res)
        this.allPrestataires =res;
      },
      (err) => {
        console.log(err)
      }
    )
  }
 
  getStructures(){
    this.structureSanitaireService.getStructureSanitaire().subscribe(
      (res) => {
        console.log(res)
        this.allStructures = res;
      },
      (err) => {
        console.log(err)
      }
    )
  }

  selected(event ){
    console.log(event)
    /*const data = this.allStructures.find(element =>element.nom==event.option.viewValue)
    this.structures.push(data)
    console.log(data)*/
  }

  remove(event){
    console.log(event)
  }

  add(event){
    console.log(event)
    
  }
  selected1(event){
    console.log(event)
  }
  formatStructure(structures){
    structures.forEach(element => {
      delete element["nom"]
    });

    return structures;
  }



}
