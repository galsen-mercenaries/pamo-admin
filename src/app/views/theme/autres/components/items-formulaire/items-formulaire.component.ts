import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-items-formulaire',
  templateUrl: './items-formulaire.component.html',
  styleUrls: ['./items-formulaire.component.scss']
})
export class ItemsFormulaireComponent implements OnInit {
  roleForm: FormGroup;
  specialisationForm: FormGroup;
  structureSanitaireForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {item: any, mode?: 'edit' | 'create', type: 'role' | 'specialisation' | 'structureSanitaire'}) { }

  ngOnInit() {
    console.log('data', this.data);
    if(this.data.type === 'role') {

      this.roleForm = new FormGroup({
        nom : new FormControl({value: null}, Validators.required),
        code : new FormControl({value: null}, Validators.required)
      })
    } else if(this.data.type === 'specialisation') {
      this.specialisationForm = new FormGroup({
        nom : new FormControl({value: this.data?.item?.nom}, Validators.required),
        code : new FormControl({value: this.data?.item?.code}, Validators.required)
      })
    } else {
      this.structureSanitaireForm = new FormGroup({
        nom : new FormControl({value: this.data?.item?.nom}, Validators.required),
        code : new FormControl({value: this.data?.item?.code}, Validators.required),
        ville : new FormControl({value: this.data?.item?.ville}, Validators.required)
      })
    }
  }

}
