import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MeetingService } from '../../meeting-service/meeting.service';


@Component({
  selector: 'app-delete-meeting',
  templateUrl: './delete-meeting.component.html',
  styleUrls: ['./delete-meeting.component.scss']
})
export class DeleteMeetingComponent implements OnInit {
  errorMsg: string;
  meeting

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private meetingService : MeetingService,
    private matDialog: MatDialogRef<DeleteMeetingComponent>) { }

  ngOnInit(): void {
  }

  confirmBanir(){
    this.errorMsg = null;

    this.meetingService.actionMeeting(this.data.meeting, this.data.type).subscribe(
      (res) => {
        this.matDialog.close({success:true})
        console.log(res)
      },
      (err) =>{
        this.errorMsg = "Une Erreur est survenue"
      }

    )
  }

  decline(){
    this.matDialog.close();
  }

}
