import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA   } from '@angular/material/dialog';
import { PrestataireService } from '../../prestataire-service/prestataire.service';


@Component({
  selector: 'app-delete-prestataire',
  templateUrl: './delete-prestataire.component.html',
  styleUrls: ['./delete-prestataire.component.scss']
})
export class DeletePrestataireComponent implements OnInit {
  errorMsg : string;
  prestataire

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private prestataireService : PrestataireService,
    private matDialog: MatDialogRef<DeletePrestataireComponent>
    ) { }

  ngOnInit(): void {
  }

  confirmBanir(){
    this.errorMsg = null;

    this.prestataireService.deletePrestataire(this.data.prestataire).subscribe(
      (res) => {
        this.matDialog.close({success: true});
        console.log(res);
      },
      (err) => {
        this.errorMsg = "Erreur lors de l'opération !"
        console.log(err)
      }
    )
  }

  decline(){
    this.matDialog.close();
  }
}
