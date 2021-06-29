import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Auth2Service } from '../../shared/services/auth2.service';

@Component({
  selector: 'app-farmview',
  templateUrl: './farmview.component.html',
  styleUrls: ['./farmview.component.css']
})
export class FarmviewComponent implements OnInit, OnDestroy {
  farmid: number;
  private sub: any;
  userInfo: any;
  farmDetails: any;
  farmName: string;
  location: string;
  treeGroups: any;

  constructor(private route: ActivatedRoute, private router: Router, public authService: Auth2Service,) {
    window.scrollTo(0, 0);

    this.farmName = null;
    this.location = null;
    this.treeGroups = null;


    const param = 'id';
    this.sub = this.route.params.subscribe(params => {
      this.farmid = +params[param];
    });
    this.farmDetails = null;

    const uid = JSON.parse(localStorage.getItem('user')).uid;
    this.authService.getUser(uid).subscribe(u => {
      this.userInfo = u;
      this.farmDetails = this.userInfo.farms[this.farmid];
      this.farmName = this.farmDetails.name;
      this.location = this.farmDetails.location;
      this.treeGroups = this.farmDetails.treeGroups;
    });


  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  viewFarmDetail(index): void {
    this.router.navigate(['/farmview/' + index]);
  }

  goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  addTreeGroup(): void {
    const treeGroup =
    {
      groupID: 'groupID',
      harvestDate: 'growthsched Object',
      trees: {
        lng: 123,
        lat: 12,
        img: 'image source'
      }
    }
      ;

    this.userInfo.farms[this.farmid].treeGroups.push(treeGroup);
    console.log(this.userInfo.farms);



  }
}
