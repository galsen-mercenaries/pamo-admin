import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserModel } from '../../../../../models/user.model';
import { AutresService } from '../../../autres/autres.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  structuresSanitaires$;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: UserModel, mode?: 'edit' | 'see' | 'create'}, private autresService: AutresService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup ({
      userId : new FormControl({value: this.data?.user?.userId, disabled: false}),
      nom : new FormControl({value: this.data?.user?.nom, disabled: this.data.mode === 'see'}, Validators.required),
      prenom : new FormControl({value: this.data?.user?.prenom, disabled: this.data.mode === 'see'}, Validators.required),
      email : new FormControl({value: this.data?.user?.email, disabled: this.data.mode === 'see'}, Validators.required),
      numero : new FormControl({value: this.data?.user?.numero, disabled: this.data.mode === 'see'}, Validators.required),
      adresse : new FormControl({value: this.data?.user?.adresse, disabled: this.data.mode === 'see'}, Validators.required),
      roleCode : new FormControl({value: this.data?.user?.role?.code ? this.data?.user?.role?.code : 'ROLE_USER', disabled: this.data.mode === 'see'}, Validators.required),
      structuresanitaireId : new FormControl({value: this.data?.user?.structuresanitaireId , disabled: this.data.mode === 'see'}),
      password : new FormControl(),
    });
    this.getStructureSanitaire();
  }

  onUpdate() {
    console.log('form', this.userForm.value);

  }

  getStructureSanitaire(){
    this.structuresSanitaires$ = this.autresService.getStructureSanitaire();
  }

}
