import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  things;
  locations;
  items = [];

  constructor(private router: Router, private db: AngularFirestore) {
    this.things = db.collection('weather').valueChanges();


    const myObserver = {
      next: x => {
        x.forEach(sample => {
          const tempObject = {
            // insert the id too
            days: sample.days,
            location: sample.location
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
