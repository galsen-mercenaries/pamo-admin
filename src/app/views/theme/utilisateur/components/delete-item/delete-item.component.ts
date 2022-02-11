import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserModel } from "../../../../../models/user.model";
import { AlertMsgService } from "../../../../shared/alert-msg/alert-msg.service";
import { UtilisateurService } from "../../user-service/utilisateur.service";

@Component({
  selector: "app-delete-item",
  templateUrl: "./delete-item.component.html",
  styleUrls: ["./delete-item.component.scss"],
})
export class DeleteItemComponent implements OnInit {
  errorMsg: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: UserModel, role: any},
    private userServ: UtilisateurService,
    private matDialog: MatDialogRef<DeleteItemComponent>,
    private alertService: AlertMsgService
  ) {}

  ngOnInit(): void {}

  confirmBanir() {
    this.errorMsg = null;
    let copy = this.data.user;
    copy = Object.assign({}, copy, {role: this.data.role});

    this.userServ.banUtilisateur(copy).subscribe(
      (res) => {
        this.alertService.displaySuccessMsg("Le compte de l'utilisateur a été desactivé");
        const data = { payload: copy };
        this.matDialog.close(data);
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
