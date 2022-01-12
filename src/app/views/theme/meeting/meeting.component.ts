import { Component, OnInit } from '@angular/core';
import { DeleteMeetingComponent } from './components/delete-meeting/delete-meeting.component';
import {MeetingService} from './meeting-service/meeting.service'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditMeetingComponent } from './components/edit-meeting/edit-meeting.component';


@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {
  //meetings : any
  selectedMeeting : any
  confirmedMeeting : number = 0
  canceledMeeting : number = 0
  pendingMeeting : number = 0
  Meetings : any
  p: number = 1;
  pagelimit: number = 6;
  totalMeetings: number = 0
  meetingStatus : string

  constructor(
    private meetingService : MeetingService,
    private matDialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.countMeetingByStatus()
    //this.getAllMeetings()
    this.getMeetingPagination(this.pagelimit,0)
    this.countMeeting()
  }

  countMeetingByStatus(){
    this.meetingService.countMeetingByStatus("CONFIRMED").subscribe(
      (res) => {
        this.confirmedMeeting = res.count
        console.log(res.count,"Confirmed")
      }
    )
    this.meetingService.countMeetingByStatus("PENDING").subscribe(
      (res) => {
        this.pendingMeeting = res.count
        console.log(res.count,"Pending")
      }
    )
    this.meetingService.countMeetingByStatus("CANCELED").subscribe(
      (res) => {
        this.canceledMeeting = res.count
        console.log(res.count,"Canceled")
      }
    )
  }

  getAllMeetings(){
    this.meetingService.getAllMeetings().subscribe(
      (res) => {
        console.log(res)
        this.Meetings = res
        console.log(res[0].medecin.user)
      }
    ),
    (err) => {
      console.log(err)
    }
  }

  getMeetingPagination(limit,skip){
    this.meetingService.getMeetingPagination(limit,skip).subscribe(
      (res)=>{
        this.Meetings = res
        console.log(res)
      }
    )
  }

  getPage(event){
    this.p=event
    var skip=(event-1)*this.pagelimit
    this.getMeetingPagination(this.pagelimit,skip)
  }

  countMeeting(){
    this.meetingService.CountTotalMeeting().subscribe(
      (res)=>{
        this.totalMeetings = res.count
        console.log(res)
      }
    )
  }

  selectMeetingStatus(){

    this.meetingService.getMeetingPagination(this.pagelimit,0,this.meetingStatus).subscribe(
      (res)=>{
        this.Meetings = res
        console.log(res)
      }
    )
    if(this.meetingStatus=='CONFIRMED'){
      this.totalMeetings = this.confirmedMeeting
    }
    else if (this.meetingStatus=='CANCELED'){
      this.totalMeetings = this.canceledMeeting    
    }
    else{
      this.totalMeetings = this.pendingMeeting
    }
  }

  cancelMeeting(meeting, type){
    const  matDialogRef = this.matDialog.open(DeleteMeetingComponent,{
      data: {meeting},
      width : '450px'
    });

    matDialogRef.afterClosed().subscribe((res: {success:boolean}) =>{
      if (res && res.success){
        this.getMeetingPagination(this.pagelimit,0)
      }
    })
    //console.log(meeting)
  }

  actionMeeting(meeting,type){
    //TypeModel = type == "edit" ? EditMeetingComponent : DeleteMeetingComponent
    //meeting["status"] = type == "edit" ? "CONFIRMED" : "CANCELED"
    meeting.dateMedecin =  meeting.dateMedecin ? meeting.dateMedecin : meeting.datePatient
    meeting.datePatient =  meeting.datePatient ? meeting.datePatient : meeting.dateMedecin 
    console.log(meeting)
    
    const  matDialogRef = this.matDialog.open(DeleteMeetingComponent,{
      data: {meeting,type},
      width : '450px'
    });

    matDialogRef.afterClosed().subscribe((res: {success:boolean}) =>{
      if (res && res.success){
        this.getMeetingPagination(this.pagelimit,0)
      }
    })
  }
}
