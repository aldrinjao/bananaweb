import { Component, OnInit, ViewChild } from '@angular/core';
import { UpdateService } from '../shared/services/update.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {


  varieties = {};
  things;
  test = [];

  constructor(private updateSW: UpdateService) { }

  ngOnInit(): void {

    this.updateSW.checkUpdates();

  }


}

