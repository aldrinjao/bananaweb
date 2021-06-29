import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';

import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class FormComponent implements OnInit {

  @ViewChild('stepper') private myStepper: MatStepper;
  @ViewChild('vstepper') private myStepper2: MatStepper;

  selectedLocation = '';
  selectedVariety = '';
  selectedVariety2 = '';
  selectedStage = '60';
  selectedUrl;

  harvestDate = new Date();


  tempdays;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  labelPosition: 'before' | 'after' = 'after';

  defaultElevation = 2;
  raisedElevation = 8;

  varthings;
  varItems = [];

  things;
  locations;
  items = [];
  farmlabel = '';


  yieldvar;
  yield = [];

  stages = [];
  currentDate = new Date();

  practices = [];
  managements = [];
  growthSched = {};

  alternateSide = 'false';
  firstContentSide = 'right';

  singleHarvest;
  totalHarvest;
  userInfo;
  mobile = false;

  size;


  batchsize = 1;

  constructor(private formBuilder: FormBuilder, private router: Router, private db: AngularFirestore) {

    // fetch weather info

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


    // fetch variety info
    this.varthings = db.collection('banana').valueChanges();

    const myObserver2 = {
      next: x => {
        x.forEach(sample => {
          const tempObject = {
            // insert the id too
            heatReqs: sample.stages,
            variety: sample.variety,
            practice: sample.practice,
            management: sample.management

          };
          this.varItems.push(tempObject);
          this.selectedVariety = sample.variety;

        });

      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),

    };

    this.varthings.subscribe(myObserver2);


    // fetch yield info
    this.yieldvar = db.collection('harvest').valueChanges();

    const myObserver3 = {
      next: x => {
        x.forEach(sample => {
          const tempObject = {
            // insert the id too
            yield: sample.yield,
            location: sample.location


          };
          this.yield.push(tempObject);

        });

      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),

    };

    this.yieldvar.subscribe(myObserver3);


  }

  ngOnInit(): void {
    if (window.screen.width <= 767) { // 768px portrait
      this.mobile = true;
      this.size = window.screen.width;
    }


    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this.formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });

  }


  onResize(event): void {
    if (window.screen.width > 768) { // 768px portrait
      this.mobile = false;
    }

    this.size = event.target.innerWidth;

  }

  goForward(): void {
    window.scrollTo(0, 50);
    this.myStepper.next();
    this.myStepper2.next();

  }

  setStages(variety: string): void {


    this.varItems.forEach(element => {
      const field = 'variety';

      if (element[field] === variety) {
        let param = 'heatReqs';
        this.stages = element[param];

        param = 'practice';
        this.practices = element[param];

        param = 'management';
        this.managements = element[param];

      }
    });

    this.selectedUrl = variety.toLowerCase();
    Object.keys(this.stages).forEach((key) => (this.stages[key] === '') && delete this.stages[key]);
    Object.keys(this.practices).forEach((key) => (this.practices[key] === '') && delete this.practices[key]);


  }

  aaa(selectedd): void {

    this.selectedVariety = selectedd;
    this.selectedVariety2 = this.selectedVariety.toLowerCase();
    this.setStages(selectedd);
    this.goForward();

  }

  calculateDiff(): number {
    const startDate = new Date(2021, 0, 1);
    const ccurrentDate = new Date();
    const days = Math.floor((ccurrentDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

  calculateHarvestDate(stages, practices): void {

    this.growthSched = {};
    // this.currentDate.setDate(this.currentDate.getDate() + 111);

    let runningTotal = 0;
    let additionalDays = 0;
    let heatreqRunningTotal = 0;
    const trimmedstages = {};
    const trimmedpractices = {};
    
    for (const key of Object.keys(stages)) {
      trimmedstages[key] = stages[key];
      trimmedpractices[key] = practices[key];
    }


    Object.keys(trimmedstages).forEach((key) => (Number(key) <= Number(this.selectedStage)) && delete trimmedstages[key]);
    Object.keys(trimmedpractices).forEach((key) => (Number(key) <= Number(this.selectedStage)) && delete trimmedpractices[key]);

    // recalculate after trimming

    for (const hkey of Object.keys(trimmedstages)) {
      heatreqRunningTotal = heatreqRunningTotal + trimmedstages[hkey];
      trimmedstages[hkey] = heatreqRunningTotal;

    }



    for (const hkey of Object.keys(trimmedstages)) {
      // tslint:disable-next-line: no-shadowed-variable
      runningTotal = 0;
      additionalDays = 0;
      for (const tkey of Object.keys(this.tempdays)) {
        this.currentDate = new Date();
        const temp: number = this.tempdays[tkey]
        runningTotal = runningTotal + temp;
        additionalDays++;

        if (runningTotal >= trimmedstages[hkey]) {

          this.currentDate.setDate(this.currentDate.getDate() + additionalDays);

          const tempObject = {
            // insert the id too
            stageDate: this.currentDate,
            bbchStage: hkey,
            req: trimmedstages[hkey],
            practice: trimmedpractices[hkey],
            management: this.managements[hkey],
            gdd: runningTotal

          };

          this.growthSched[hkey] = tempObject;

          break;
        }


      }

    }

    let finalkey;
    for (const key of Object.keys(this.growthSched)) {
      finalkey = key;

    }

    this.harvestDate = this.growthSched[finalkey].stageDate;
    console.log('this.harvestDate :>> ', this.growthSched);
    const hmonth = this.harvestDate.getMonth() + 1;

    this.calculateYield(hmonth);

    console.log('this.growthSched :>> ', this.growthSched);
  }



  calculateYield(harvestMonth): void {

    let harvestQuarter = '1';
    if (harvestMonth < 4) {
      harvestQuarter = '1';
    }
    if (harvestMonth < 7 && harvestMonth >= 4) {
      harvestQuarter = '2';
    }
    if (harvestMonth < 10 && harvestMonth >= 7) {
      harvestQuarter = '3';
    }
    if (harvestMonth >= 9) {
      harvestQuarter = '4';
    }
    const quarter = this.selectedVariety.toLowerCase() + ' ' + harvestQuarter;

    this.yield.forEach(element => {

      if (element.location === this.selectedLocation) {

        this.singleHarvest = element.yield[quarter];
      }

    });
  }


  cropSelected(stageSelected): void {
    if (stageSelected === 79) {
      this.currentDate = new Date();
      const hmonth = this.currentDate.getMonth() + 1;
      this.harvestDate = this.currentDate;
      this.growthSched = [];
      this.calculateYield(hmonth);
      this.goForward();


    } else {


      this.selectedStage = stageSelected;
      this.items.forEach(element => {
        const field = 'location';

        if (element[field] === this.selectedLocation) {
          const param = 'days';
          this.tempdays = element[param];
          Object.keys(this.tempdays).forEach((key) => (Number(key) <= Number(this.calculateDiff())) && delete this.tempdays[key]);

        }
      });

      this.goForward();

      this.calculateHarvestDate(this.stages, this.practices);


    }
  }

  batchsizeUpdate(event): void {
    this.batchsize = event.target.value;
    this.totalHarvest = Math.round(this.singleHarvest * this.batchsize);

  }


}
