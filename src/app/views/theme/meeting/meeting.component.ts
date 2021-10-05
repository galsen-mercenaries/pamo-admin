import { Component, OnInit } from '@angular/core';
import {MeetingService} from './meeting-service/meeting.service'
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

  constructor(private meetingService : MeetingService) { }

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
}
