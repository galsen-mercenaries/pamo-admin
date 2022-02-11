import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserModel } from '../../../../../models/user.model';
import { AlertMsgService } from '../../../../shared/alert-msg/alert-msg.service';
import { AutresService } from '../../../autres/autres.service';
import { UserRegistration, UtilisateurService } from '../../user-service/utilisateur.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  structuresSanitaires$;
  isLoading: boolean;
  hasError: boolean;
  errorMsg: string;
  roles: { code: string, nom: string, roleId: number}[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: UserModel, mode?: 'edit' | 'see' | 'create'}, private autresService: AutresService, private userService: UtilisateurService, private matDialogRef: MatDialogRef<EditUserComponent>, private alertService: AlertMsgService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup ({
      userId : new FormControl({value: this.data?.user?.userId, disabled: false}),
      account_status : new FormControl({value: this.data?.user?.account_status, disabled: this.data.mode === 'see'}, Validators.required),
      nom : new FormControl({value: this.data?.user?.nom, disabled: this.data.mode === 'see'}, Validators.required),
      prenom : new FormControl({value: this.data?.user?.prenom, disabled: this.data.mode === 'see'}, Validators.required),
      email : new FormControl({value: this.data?.user?.email, disabled: this.data.mode === 'see'}, Validators.required),
      numero : new FormControl({value: this.data?.user?.numero, disabled: this.data.mode === 'see'}, Validators.required),
      adresse : new FormControl({value: this.data?.user?.adresse, disabled: this.data.mode === 'see'}, Validators.required),
      roleCode : new FormControl({value: this.data?.user?.role?.code ? this.data?.user?.role?.code : 'ROLE_USER', disabled: this.data.mode === 'see' || this.data.mode === 'edit'}, Validators.required),
      structuresanitaireId : new FormControl({value: +this.data?.user?.structuresanitaireId , disabled: this.data.mode === 'see'}),
    });
    this.getStructureSanitaire();
    this.getRoles();

  }

  getRoles() {
    this.autresService.getRoles().subscribe(data => {
        this.roles = data;
    });
}
  onUpdate() {
    this.isLoading = true;
    this.hasError = false;
    this.errorMsg = 'Une erreur est survenue';
    const payload: UserRegistration = this.userForm.value;
    if(!payload?.structuresanitaireId) delete payload.structuresanitaireId;
    if(payload?.structuresanitaireId) payload.structuresanitaireId = +payload?.structuresanitaireId;

    if(!this.data?.user?.userId) {
      payload.password = Math.random().toString(10).slice(-8);
      this.userService.registernNewUser(payload).subscribe((res: any) => {
        this.isLoading = false;
        this.alertService.displaySuccessMsg("La création de l'utilisateur a été effectué avec succés");
        const data = { payload: res };
        this.close(data);
      }, (err: any) => {
        this.hasError = true;
        this.isLoading = false;
        this.errorMsg = err?.error?.error?.message;
      })
    }else {
      console.log('payload', payload);
      delete payload.roleCode;
      this.userService.updateUser(payload).subscribe((res: any) => {
        this.isLoading = false;
        this.alertService.displaySuccessMsg("Les infos de l'utilisateur ont bien été mises à jour");
        const data = { payload };
        this.close(data);
      }, (err: any) => {
        this.hasError = true;
        this.isLoading = false;
        this.errorMsg = err?.error?.error?.message;
      });
    }
  }

  getStructureSanitaire(){
    this.structuresSanitaires$ = this.autresService.getStructureSanitaire();
  }

  close(data?: any) {
    this.matDialogRef.close(data);
  }

}
