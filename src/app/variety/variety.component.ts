import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-variety',
  templateUrl: './variety.component.html',
  styleUrls: ['./variety.component.css']
})
export class VarietyComponent implements OnInit {

  defaultElevation = 2;
  raisedElevation = 8;

  varieties = {};
  things;
  items = [];

  constructor(private router: Router, private db: AngularFirestore) {
    this.things = db.collection('banana').valueChanges();


    const myObserver = {
      next: x => {
        x.forEach(sample => {
          const tempObject = {
            // insert the id too
            heatReqs: sample.stages,
            variety: sample.variety
          };
          this.items.push(tempObject);

        });

      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),


    };


    this.things.subscribe(myObserver);
  }

  ngOnInit(): void {
    console.log('this.things :>> ', this.items);

  }


}
