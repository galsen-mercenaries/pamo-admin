import { Component, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SharedService } from "../../shared/shared.service";
import { NewsService } from "./news.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { forkJoin, Observable } from "rxjs";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.scss"],
})
export class NewsComponent implements OnInit {
  newsCount: any;
  news: any;
  modalRef: BsModalRef;
  selectedNew: any;
  newsAttente: number = 0;
  newsPublie: number = 0;

  constructor(
    private modalService: BsModalService,
    private newsService: NewsService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getNews();
    this.countNewsByStatus();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getNews() {
    this.newsService.getNews().subscribe((res) => {
      this.news = res;
      console.log(this.news);
    });
  }

  deleteNew(code, template) {
    this.selectedNew = code;
    this.modalRef = this.modalService.show(template);
  }

  confirmDelete() {
    this.newsService.deleteNew(this.selectedNew).subscribe(
      (res) => {
        console.log(res);
        this.getNews();
        this.modalRef.hide();
        this.newsPublie = this.newsPublie - 1;
        this.newsAttente = this.newsAttente - 1;
        //this.newsPublie = this.newsPublie-1
        //this.newsAttente = this.newsAttente-1
      },
      (err) => {
        console.log(err);
      }
    );
  }
  decline() {
    this.modalRef.hide();
  }

  countNewsByStatus() {
    let observables: Observable<any>[] = [];
    const status = [true, false];
    for (var stats of status) {
      observables.push(this.newsService.countNewsByStatut(stats));
    }
    forkJoin(observables).subscribe(
      (res) => {
        console.log(res);
        this.newsCount = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editNew(id,mode){
    console.log(mode,id)
    var url = "theme/news/edit/"+id;
    this.router.navigate([url])
    
  }
}
