import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserModel } from '../../../../../models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: UserModel, mode?: 'edit' | 'see' | 'create'}) { }

  ngOnInit(): void {
    this.userForm = new FormGroup ({
      userId : new FormControl({value: this.data?.user?.userId, disabled: false}),
      nom : new FormControl({value: this.data?.user?.nom, disabled: this.data.mode === 'see'}, Validators.required),
      prenom : new FormControl({value: this.data?.user?.prenom, disabled: this.data.mode === 'see'}, Validators.required),
      email : new FormControl({value: this.data?.user?.email, disabled: this.data.mode === 'see'}, Validators.required),
      numero : new FormControl({value: this.data?.user?.numero, disabled: this.data.mode === 'see'}, Validators.required),
      adresse : new FormControl({value: this.data?.user?.adresse, disabled: this.data.mode === 'see'}, Validators.required),
      role : new FormControl({value: this.data?.user?.role?.code ? this.data?.user?.role?.code : 'ROLE_USER', disabled: this.data.mode === 'see'}, Validators.required),
    })
  }

  onUpdate() {
    console.log('form', this.userForm.value);

  }

}