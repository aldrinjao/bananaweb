import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {
  currentDate = new Date();
  stages = {};
  variety = {};

  constructor(private router: Router) {
    this.currentDate.setDate(this.currentDate.getDate());
    if (this.router.getCurrentNavigation().extras.hasOwnProperty('state')) {
      this.stages = this.router.getCurrentNavigation().extras.state.stages;
      this.variety = this.router.getCurrentNavigation().extras.state.variety.toLowerCase();
    } else {
      router.navigate(['/']);
    }

    Object.keys(this.stages).forEach((key) => (this.stages[key] === '') && delete this.stages[key]);

  }

  ngOnInit(): void {
    console.log('this.variety :>> ', this.variety);

  }

}
