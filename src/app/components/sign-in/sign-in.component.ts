import { Component, OnInit } from '@angular/core';
import { Auth2Service } from "../../shared/services/auth2.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    public authService: Auth2Service
  ) { }

  ngOnInit(): void {
  }

}
