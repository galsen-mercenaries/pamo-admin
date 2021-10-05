import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../../../shared/shared.service';
import { PrestataireService } from '../../prestataire-service/prestataire.service';


@Component({
  selector: 'app-add-prestataire',
  templateUrl: './add-prestataire.component.html',
  styleUrls: ['./add-prestataire.component.scss']
})
export class AddPrestataireComponent implements OnInit {

  prestataireForm = this.formBuilder.group({
    nom: "",
    typePrestataire: "",
    email: "",
    date_creation: "",
    adresse: "",
    is_actif: Boolean,
    is_all_night: Boolean,
    periodicityType: "",
    watch_start_date: "",
    watch_end_date: "",
    watch_periodicity_value: ""
  })
  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
  }

}
