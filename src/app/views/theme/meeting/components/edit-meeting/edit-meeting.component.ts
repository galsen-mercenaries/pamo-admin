import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.scss']
})
export class EditMeetingComponent implements OnInit {

  meetingForm : any
  meeting : any

  constructor() { }

  ngOnInit(): void {
  }

  onUpdate(){}

}
