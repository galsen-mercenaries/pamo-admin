import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeetingService } from '../../meeting-service/meeting.service';

@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.scss']
})
export class EditMeetingComponent implements OnInit {

  meetingForm : any
  meeting : any
  errorMsg

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private meetingService: MeetingService,
    private matDialog: MatDialogRef<EditMeetingComponent>
  ) { }

  ngOnInit(): void {
  }

  onUpdate(meeting){
    this.meetingService.editMeeting(meeting).subscribe(
      (res) =>{
        this.matDialog.close({success: true})
        console.log(res)
      },
      (err) =>{
        console.log(err)
      }
    )
    console.log(meeting)
  }

  editMeeting(){}

  decline(){
    this.matDialog.close()
  }

}
