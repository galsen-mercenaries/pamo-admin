import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserModel } from '../../../../../models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: UserModel, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userId: [this.data.userId, [Validators.required]],
      nom: [this.data.nom, [Validators.required]],
      prenom: [this.data.prenom, [Validators.required]],
      email: [this.data.email],
      numero: [this.data.numero],
      adresse: [this.data.adresse],
      role: [this.data.role.nom, [Validators.required]],
      image: [this.data.image],
    });
  }

  onUpdate() {

  }

}
