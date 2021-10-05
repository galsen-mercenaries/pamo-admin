import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { NewsService } from './news.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news : any
  modalRef: BsModalRef;
  selectedNew : any;
  newsAttente : number = 0
  newsPublie : number = 0
  

  constructor(private modalService: BsModalService,private newsService : NewsService, private sharedService : SharedService, private router : Router) { }

  ngOnInit(): void {
    this.getNews();
    this.countNewsByStatus()
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getNews(){
    this.newsService.getNews().subscribe(
      (res) => {
       this.news = res
       console.log(this.news)
      }
      )
  }

  deleteNew(code,template){
    this.selectedNew = code
    this.modalRef = this.modalService.show(template)
  }

  confirmDelete(){
    this.newsService.deleteNew(this.selectedNew).subscribe(
      (res) => {
        console.log(res)
        this.getNews()
        this.modalRef.hide()
        this.newsPublie = this.newsPublie-1
        this.newsAttente = this.newsAttente-1
        //this.newsPublie = this.newsPublie-1
        //this.newsAttente = this.newsAttente-1
      },
      (err) =>{
        console.log(err)
      }
    )
  }
  decline(){
    this.modalRef.hide()
  }

  countNewsByStatus(){
    this.newsService.countNewsByStatut(false).subscribe(
      (res) => {
        this.newsAttente = res.count
        console.log(this.newsAttente)
      }
    )
    this.newsService.countNewsByStatut(true).subscribe(
      (res) => {
        this.newsPublie = res.count
        console.log(this.newsPublie)
      }
    )  
  }
}
