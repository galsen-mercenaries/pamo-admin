import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {
  newForm = this.formBuilder.group({
    titre : "",
    contenu : "",
    image_url : "",
    is_actif : Boolean
  });
  private selectedFile : any
  private base64textString: String = "";

  constructor(private formBuilder : FormBuilder,private router : Router, private newsService : NewsService) { }

  ngOnInit(): void {
  }
  
  handleFileInput(evt) {
    var files = evt;
    var file = files[0];
    
    if (files && file) {
      console.log(file)
      
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
    console.log(this.selectedFile)
    const formData = new FormData()
    formData.append('file',this.selectedFile)
    console.log(formData)
    /*var data ={};
    data['titre'] = this.newForm.value['titre']
    data['contenu'] = this.newForm.value['contenu']*/
    this.newsService.UploadImage(formData).subscribe(
      (res) => {
        console.log(res)
        data['image_url'] = res
        this.newsService.addNews(data).subscribe(
          (res) =>{
            console.log(res)
            this.router.navigate(['/theme/news'])
          }
        )
      },
      (err) =>{
        console.log(err)
      }
    )
    //data["image_url"] = "data:image/png;base64," + this.base64textString;
    console.log(data)
    
  }


}
