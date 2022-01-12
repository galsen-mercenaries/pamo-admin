import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { SharedService } from '../../../shared/shared.service';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {
  id
  newForm = this.formBuilder.group({
    titre : "",
    categorie: "",
    contenu : "",
    imageUrl : "",
    isActif : Boolean
  });
  private selectedFile : any
  private base64textString: String = "";
  mode: string;
  selectedNew: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router, 
    private newsService : NewsService,
    private sharedService : SharedService,
    private activatedRoute : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    if(this.id){
      this.mode = "update";
      this.getNewsById(this.id)
    }
  }
  
  handleFileInput(evt) {
    var files = evt;
    var file = files[0];
    
    if (files && file) {
      console.log(file)
      console.log(file.size)
      this.selectedFile = file
      console.log(this.selectedFile)
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    //console.log(this.base64textString)
  }
  onSubmit(){
    var data = this.newForm.value;
    const formData = new FormData()
    formData.append('file',this.selectedFile)
    console.log(formData)
    if(this.selectedFile){
      console.log("test")
      this.newsService.UploadImage(formData).subscribe(
        (res) =>{ 
          console.log(res["Location"])
          data["imageUrl"] = res["Location"]
          if(this.mode=="update"){
            this.newsService.updateNew(this.id,data).subscribe(
              (res) =>{
                console.log(res)
                this.router.navigate(['/theme/news'])
              },
              (err)=>{
                console.log(err)
              }
            );
          }
          else{
            this.newsService.addNews(data).subscribe(
              (res) =>{
                console.log(res)
                this.router.navigate(['/theme/news'])
              },
              (err)=>{
                console.log(err)
              }
            );
          }

        },
        (err) =>{
          console.log(err)
        })
    }
    else{
      data["imageUrl"] = this.selectedNew.imageUrl
      this.newsService.updateNew(this.id,data).subscribe(
        (res) =>{
          console.log(res)
          this.router.navigate(['/theme/news'])
        },
        (err)=>{
          console.log(err)
        }
      );
    }
    
  }

  getNewsById(id){
    this.newsService.getNewById(id).subscribe(
      (res) => {
        console.log(res)
        this.selectedNew = res
        this.newForm.patchValue(
          {
            titre : res.titre,
            categorie : res.categorie,
            contenu : res.contenu,
            isActif : res.isActif
          }
          );
      },
      (err) => {
        console.log(err)
      }
    )
  }


}
