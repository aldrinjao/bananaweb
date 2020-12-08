import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-harvest',
  templateUrl: './harvest.component.html',
  styleUrls: ['./harvest.component.css']
})
export class HarvestComponent implements OnInit {

  name: string;
  currentDate = new Date();
  heatreq;

  constructor(private route: ActivatedRoute, private router: Router) {

    this.currentDate.setDate(this.currentDate.getDate() + 100);

    if (this.router.getCurrentNavigation().extras.hasOwnProperty('state')) {
      this.heatreq = this.router.getCurrentNavigation().extras.state.heatreq;
    } else {
      router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    const urlfield = 'stage';
    this.name = this.route.snapshot.paramMap.get(urlfield);

  }

}
