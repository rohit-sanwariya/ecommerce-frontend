import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.scss']
})
export class NewsLetterComponent implements OnInit {
  email:string = ''
  constructor() { }

  ngOnInit(): void {
  }
  newsLetterSubscribe(input:any,newLetterForm:any ){

    console.log(this.email,input.valid);
    newLetterForm.reset()


  }
}
