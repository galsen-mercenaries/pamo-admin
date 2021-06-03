import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RoleModel } from '../../../../../models/role.model';
import { SpecialisationModel } from '../../../../../models/specialisation.model';
import { StructureSanitaireModel } from '../../../../../models/structureSanitaire.model';
import { AutresService } from '../../autres.service';

@Component({
  selector: 'app-items-formulaire',
  templateUrl: './items-formulaire.component.html',
  styleUrls: ['./items-formulaire.component.scss']
})
export class ItemsFormulaireComponent implements OnInit {
  roleForm: FormGroup;
  specialisationForm: FormGroup;
  structureSanitaireForm: FormGroup;
  hasError: boolean;
  hasErrorSubmitting: boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {item: any, mode?: 'edit' | 'create', type: 'role' | 'specialisation' | 'structureSanitaire'}, private fb: FormBuilder, private autreServ: AutresService, private matdialog: MatDialogRef<ItemsFormulaireComponent>) { }

  ngOnInit() {
    console.log('data', this.data);
    if(this.data.type === 'role') {
      this.roleForm = this.fb.group({
        roleId : [this.data?.item?.roleId, ],
        nom : [this.data?.item?.nom, [Validators.required]],
        code : [this.data?.item?.code, [Validators.required]]
      })
    } else if(this.data.type === 'specialisation') {
      this.specialisationForm = this.fb.group({
        specialisationId : [this.data?.item?.specialisationId, ],
        nom : [this.data?.item?.nom, [Validators.required]],
        code : [ this.data?.item?.code, [Validators.required]]
      });
    } else {
      this.structureSanitaireForm = this.fb.group({
        structuresanitaireId : [ this.data?.item?.structuresanitaireId ],
        nom : [ this.data?.item?.nom, [Validators.required]],
        code : [this.data?.item?.code, [Validators.required]],
        ville : [this.data?.item?.ville, [Validators.required]]
      })
    }
  }

  submit() {
    this.hasError = false;
    console.log('this.roleForm.value', this.structureSanitaireForm?.value);

    if(this.roleForm?.valid || this.specialisationForm?.valid || this.structureSanitaireForm?.valid) {
      if(this.data.type === 'role') {
        switch (this.data.mode) {
          case 'create':
            this.addRole(this.roleForm.value);
            break;
          case 'edit':
            this.patchRole(this.roleForm.value);
            break;
          default:
            break;
        }
      } else if(this.data.type === 'specialisation') {
        console.log('this.specialisationForm.value', this.specialisationForm.value);

        switch (this.data.mode) {
          case 'create':
            this.addSpecialisation(this.specialisationForm.value);
            break;
          case 'edit':
            this.patchSpecialisation(this.specialisationForm.value);
            break;
          default:
            break;
        }
      } else if(this.data.type === 'structureSanitaire') {
        console.log('this.structureSanitaireForm.value',this.structureSanitaireForm.value);
        const payload: StructureSanitaireModel = this.structureSanitaireForm.value;
        switch (this.data.mode) {
          case 'create':
            this.addStructureSanitaires(this.structureSanitaireForm.value);
            break;
          case 'edit':
            this.patchStructureSanitaire(this.structureSanitaireForm.value);
            break;
          default:
            break;
        }
      }
    } else {
      this.hasError = true;
    }
  }

  addRole(role: RoleModel) {
    this.hasErrorSubmitting = false;
    this.autreServ.addRole(role).pipe(tap((res: any) => {
      this.matdialog.close({success: true})
    }), catchError((err)=> {
      this.hasErrorSubmitting = true;
      return of(err)
    })).subscribe()
  }

  patchRole(role: RoleModel) {
    this.hasErrorSubmitting = false;
    this.autreServ.patchRole(role).pipe(tap((res: any) => {
      this.matdialog.close({success: true})
    }),catchError((err)=> {
      this.hasErrorSubmitting = true;
      return of(err)
    })).subscribe()
  }

  addSpecialisation(spec: SpecialisationModel) {
    this.hasErrorSubmitting = false;
    this.autreServ.addSpecialisations(spec).pipe(tap((res) => {
      this.matdialog.close({success: true})
    }),catchError((err)=> {
      this.hasErrorSubmitting = true;
      return of(err)
    })).subscribe()
  }

  patchSpecialisation(spec: SpecialisationModel) {
    this.hasErrorSubmitting = false;
    this.autreServ.patchSpecialisations(spec).pipe(tap((res) => {
      this.matdialog.close({success: true})
    }),catchError((err)=> {
      this.hasErrorSubmitting = true;
      return of(err)
    })).subscribe()
  }

  addStructureSanitaires(spec: StructureSanitaireModel) {
    this.hasErrorSubmitting = false;
    this.autreServ.addStructureSanitaire(spec).pipe(tap((res) => {
      this.matdialog.close({success: true})
    }),catchError((err)=> {
      this.hasErrorSubmitting = true;
      return of(err)
    })).subscribe()
  }

  patchStructureSanitaire(item: StructureSanitaireModel) {
    this.hasErrorSubmitting = false;
    this.autreServ.patchStructureSanitaire(item).pipe(tap((res) => {
      this.matdialog.close({success: true})
    }),catchError((err)=> {
      this.hasErrorSubmitting = true;
      return of(err)
    })).subscribe()
  }

  generateString(baseString: string) {
    baseString = baseString.replace(/[^a-zA-Z0-9]/g,"");
    const charactersLength = baseString.length;
    const result = baseString[0] + charactersLength;
    this.structureSanitaireForm.patchValue({ code: result });
  }

}
