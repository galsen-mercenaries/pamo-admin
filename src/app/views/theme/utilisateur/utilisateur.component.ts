import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { UtilisateurService } from "./utilisateur.service"
import { SharedService } from '../../shared/shared.service'

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {
  
  users : any
  userCount : any
  roleSelected : ''

  modalRef: BsModalRef;
  utilisateurForm = this.formBuilder.group({
    nom: "",
    prenom: "",
    email: "",
    numero: "",
    adresse: "",
    password: "",
    role: "",
    specialisation: [""],
    structure_sante : ""
  });
  roles : any
  specialisations : any
  structures : any
  selectedUser : any

  constructor(private modalService: BsModalService, private formBuilder : FormBuilder
    ,private utilisateurService : UtilisateurService, private sharedService : SharedService) { }

  ngOnInit(): void {
    this.getRoles()
    this.getStructures()
    this.getSpecialisation()
    this.getUtilisateurs()
    
  }
  
  getRoles(){
    this.sharedService.getRoles().subscribe(
      (data) => {
        console.log(data)
        this.roles = data
      }
    )
  }

  getSpecialisation(){
    this.sharedService.getSpecialisations().subscribe(
      (data) =>{ 
        console.log(data)
        this.specialisations = data
      }
    )
  }

  getStructures(){
    this.sharedService.getStructures().subscribe(
      (data) => {
        this.structures = data
        console.log(data)
      }
    )
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  onRoleChange(value){
    this.roleSelected = value
  }

  onSubmit(){
    var utilisateur = this.utilisateurForm.value
    if(utilisateur.role!="ROLE_MEDECIN"){
      delete utilisateur['specialisation']
      delete utilisateur['structure']
    }
    console.log(utilisateur)
    this.utilisateurService.addUtilisateur(utilisateur).subscribe(
      (res) =>{
        console.log(res)
      },
      (err) =>{
        console.log(err)
      }
    )

  }
  getUtilisateurs(){
    this.utilisateurService.getUtilisateurs().subscribe(
      (data) =>{ 
        this.users = data
        console.log(data)
        this.countUserByRole(this.users)
      }
    )
  }

  countUserByRole(data){
    this.userCount = this.sharedService.groupArrayOfObjects(data,'role')
    console.log(this.userCount)
  }
  
  readutilisateur(user){
    console.log(user)
  }
  updateutilisateur(user,action){
    console.log(user)
  }
  banUtilisateur(user, template){
    this.selectedUser = user
    this.modalRef = this.modalService.show(template)
  }

  confirmBanir(){
    this.utilisateurService.banUtilisateur(this.selectedUser).subscribe(
      (res) => {
        this.getUtilisateurs()
        this.modalRef.hide()
      },
      (err) =>{
        console.log(err)
      }
    )
  }
  
  decline(){

  }
}
