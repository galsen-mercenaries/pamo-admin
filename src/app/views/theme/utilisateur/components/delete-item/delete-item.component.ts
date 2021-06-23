import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserModel } from "../../../../../models/user.model";
import { UtilisateurService } from "../../user-service/utilisateur.service";

@Component({
  selector: "app-delete-item",
  templateUrl: "./delete-item.component.html",
  styleUrls: ["./delete-item.component.scss"],
})
export class DeleteItemComponent implements OnInit {
  errorMsg: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: UserModel },
    private userServ: UtilisateurService,
    private matDialog: MatDialogRef<DeleteItemComponent>
  ) {}

  ngOnInit(): void {}

  confirmBanir() {
    this.errorMsg = null;
    this.userServ.banUtilisateur(this.data.user).subscribe(
      (res) => {
        this.matDialog.close();
      },
      (err) => {
        console.log(err);
        this.errorMsg = "Une erreur est survenue";
      }
    );
  }

  decline() {
    this.matDialog.close();
  }
}
