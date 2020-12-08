import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class FormComponent implements OnInit {

  selectedLocation = '';
  selectedRadio = 'Cardaba';
  selectedStage = '60';
  selectedUrl;

  tempdays;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  labelPosition: 'before' | 'after' = 'after';

  defaultElevation = 2;
  raisedElevation = 8;

  varthings;
  varItems = [];

  things;
  locations;
  items = [];
  farmlabel = '';

  stages = [];
  currentDate = new Date();

  growthSched = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private db: AngularFirestore) {

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

    this.varthings = db.collection('banana').valueChanges();

    const myObserver2 = {
      next: x => {
        x.forEach(sample => {
          const tempObject = {
            // insert the id too
            heatReqs: sample.stages,
            variety: sample.variety
          };
          this.varItems.push(tempObject);
          this.selectedRadio = sample.variety;
        });

      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),

    };

    this.varthings.subscribe(myObserver2);


  }

  ngOnInit(): void {

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  goForward(stepper: MatStepper): void {
    stepper.next();
  }

  setStages(variety: string): void {

    this.varItems.forEach(element => {
      const field = 'variety';

      if (element[field] === variety) {
        const param = 'heatReqs';
        this.stages = element[param];
      }
    });
    this.selectedUrl = variety.toLowerCase();
    Object.keys(this.stages).forEach((key) => (this.stages[key] === '') && delete this.stages[key]);
  }

  aaa(selectedd, stepper: MatStepper): void {
    this.selectedRadio = selectedd;
    this.setStages(selectedd);
    this.goForward(stepper);

  }

  calculateDiff(): number {
    const startDate = new Date('01-01-2020');
    const ccurrentDate = new Date();

    const days = Math.floor((ccurrentDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

  calculateHarvestDate(stages): void {



    this.growthSched = {};
    // this.currentDate.setDate(this.currentDate.getDate() + 111);

    let runningTotal = 0;
    let heatreqRunningTotal = 0;
    const trimmedstages = {};

    for (const key of Object.keys(stages)) {
      trimmedstages[key] = stages[key];

    }


    Object.keys(trimmedstages).forEach((key) => (Number(key) <= Number(this.selectedStage)) && delete trimmedstages[key]);

    // recalculate after trimming

    for (const hkey of Object.keys(trimmedstages)) {
      heatreqRunningTotal = heatreqRunningTotal + trimmedstages[hkey];
      trimmedstages[hkey] = heatreqRunningTotal;
    }


    console.log('trimmedstages :>> ', trimmedstages);

    for (const hkey of Object.keys(trimmedstages)) {
      runningTotal = 0;
      for (const tkey of Object.keys(this.tempdays)) {
        this.currentDate = new Date('01-01-2020');

        runningTotal = runningTotal + this.tempdays[tkey];


        if (runningTotal >= trimmedstages[hkey]) {

          this.currentDate.setDate(this.currentDate.getDate() + Number(tkey));


          const tempObject = {
            // insert the id too
            stageDate: this.currentDate,
            bbchStage: hkey,
            req: trimmedstages[hkey],
            gdd: runningTotal

          };

          this.growthSched[hkey] = tempObject;

          break;
        }


      }

    }


  }






  cropSelected(stageSelected, stepper: MatStepper): void {
    this.selectedStage = stageSelected;


    this.items.forEach(element => {
      const field = 'location';

      if (element[field] === this.selectedLocation) {
        const param = 'days';
        this.tempdays = element[param];
        Object.keys(this.tempdays).forEach((key) => (Number(key) <= Number(this.calculateDiff())) && delete this.tempdays[key]);

      }
    });

    this.goForward(stepper);
    this.calculateHarvestDate(this.stages);


  }


}
