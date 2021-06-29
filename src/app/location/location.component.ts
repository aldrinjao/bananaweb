import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'firebase';

import { AuthService } from '../shared/services/auth.service';
import { FarmService } from '../shared/services/farm.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialoghtmlComponent } from './dialoghtml/dialoghtml.component';
export interface DialogData {
  index: number;
  name: string;
  location: string;
  locationList: any;
  deleteFlag: boolean;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {

  test;

  selectedLocation = 'location 1';
  selectedVariety = 'cardaba';
  selectedStage = '65';


  locations;
  items = [];

  email = 'test@gmail.com';
  password = '2222222';

  user;
  users;

  visible = true;
  farms: any;

  locationList: any[] = [];

  location: string;
  name: string;
  index: number;
  deleteFlag: boolean;

  things;


  constructor(
    private router: Router,
    public authService: AuthService,
    public farmService: FarmService,
    public dialog: MatDialog
  ) {
    this.visible = false;

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialoghtmlComponent, {
      width: '80%',
      data: { deleteFlag: false, name: this.name, location: this.location, locationList: this.locationList }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.location = result.location;
        this.name = result.name;

        const farmObj = {
          location: this.location,
          name: this.name
        };

        console.log(farmObj);
        this.farms = farmObj;
        this.updateFarms(farmObj);
      }
    });


  }




  signup(): void {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }


  login(): void {
    this.users = [];
    this.authService.login(this.email, this.password);
    this.authService.getUsers().subscribe(a => {
      this.users = a;
      this.visible = false;
    });

    this.email = this.password = '';
  }

  logout(): void {
    this.authService.logout();
    this.users = [];
  }

  setFarmData(): void {
    const value = 'email';

    this.authService.getUid();
    this.authService.findUser(value).subscribe(a => {
      console.log('a :>> ', a);

    });


    const tempFarm = {
      location: this.selectedLocation,
      variety: this.selectedVariety,
      stage: this.selectedStage

    };


    this.authService.setFarmData(tempFarm);

  }

  getUserData(): void {
    this.authService.getUser().subscribe(a => {
      console.log(a);
    });
  }

  updateFarms(farms): void {
    if (this.user.farms.length > 0) {
      this.user.farms.push(farms);
    }else{
      this.user.farms[0] = farms;
    }

    this.authService.updateFarms(this.user);

  }


  addFarm(): any {

    this.locationList = [];
    this.name = null;
    this.location = null;



    this.authService.getLocations().subscribe(l => {
      l.forEach(region => {
        this.locationList.push(region.location);
      });

    });

    this.authService.userInfo.subscribe(u => {
      this.user = u;
      console.log(this.user);
    });

    this.openDialog();



  }

  editFarm(efarmIndex, elocation, ename): void {

    this.authService.getLocations().subscribe(l => {
      l.forEach(region => {
        this.locationList.push(region.location);
      });

    });


    this.authService.userInfo.subscribe(u => {
      this.user = u;
    });


    const dialogRef = this.dialog.open(DialoghtmlComponent, {
      width: '80%',
      data: { deleteFlag: false, name: ename, location: elocation, locationList: this.locationList }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.location = result.location;
        this.name = result.name;

        const farmObj = {
          location: this.location,
          name: this.name,
          index: efarmIndex
        };
        this.user.farms[efarmIndex] = farmObj;
        this.authService.updateFarms(this.user);
      }
    });






  }

  deleteFarm(farmIndex): void {
    this.authService.userInfo.subscribe(u => {
      this.user = u;
      this.user.farms.splice(farmIndex, 1);
      // array = [2, 9]
    });

    const dialogRef = this.dialog.open(DialoghtmlComponent, {
      data: { deleteFlag: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.updateFarms(this.user);
      }
    });




  }

  viewFarmDetail(farmIndex): void {
    console.log(farmIndex);
  }



}
