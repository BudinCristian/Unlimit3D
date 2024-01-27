import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-re-captcha',
  templateUrl: './re-captcha.component.html',
  styleUrls: ['./re-captcha.component.css']
})

export class ReCaptchaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  recaptcha: any[];
resolved (captchaResponse: any[])
{
  this.recaptcha= captchaResponse;
  console.log(this.recaptcha);
}
}
