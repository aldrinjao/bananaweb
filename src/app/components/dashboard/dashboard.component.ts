import { Component, OnInit } from '@angular/core';
import { Auth2Service } from '../../shared/services/auth2.service';
import { FarmService } from '../../shared/services/farm.service';
import { DialoghtmlComponent } from '../../location/dialoghtml/dialoghtml.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


export interface DialogData {
  index: number;
  farmName: string;
  location: string;
  locationList: any;
  deleteFlag: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // user information
  userInfo: any;

  // dialog data

  fName: string = null;
  location: string;
  locationList: string[] = [];


  constructor(
    public authService: Auth2Service,
    public farmService: FarmService,
    public dialog: MatDialog,
    private router: Router
  ) {

    const uid = JSON.parse(localStorage.getItem('user')).uid;
    this.authService.getUser(uid).subscribe(u => {
      this.userInfo = u;
    });


    this.farmService.getLocations().subscribe(l => {
      l.forEach(region => {
        this.locationList.push(region.location);
      });

    })
  }

  ngOnInit(): void {
  }

  addFarm(): void {
    const dialogRef = this.dialog.open(DialoghtmlComponent, {
      width: '80%',
      data: { deleteFlag: false, farmName: null, location: null, locationList: this.locationList }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.location = result.location;
        this.fName = result.farmName;
        this.userInfo.farms.push({ location: result.location, name: result.farmName, treeGroups:[] });
        this.farmService.updateFarm(this.userInfo);
      }
    });


  }
  editFarm(eindex, elocation, efname): any {
    const dialogRef = this.dialog.open(DialoghtmlComponent, {
      width: '80%',
      data: { deleteFlag: false, farmName: efname, location: elocation, locationList: this.locationList }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userInfo.farms[eindex] = ({ index: eindex, location: result.location, name: result.farmName });
        this.farmService.updateFarm(this.userInfo);
      }
    });
  }


  deleteFarm(dfarmIndex): any {

    const dialogRef = this.dialog.open(DialoghtmlComponent, {
      data: { deleteFlag: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userInfo.farms.splice(dfarmIndex, 1);
        this.farmService.updateFarm(this.userInfo);
      }
    });

  }

  viewFarmDetail(index): void {
    this.router.navigate(['/farmview/' + index]);
  }

  goHome(): void {
    this.router.navigate(['/dashboard']);
  }
}

