import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Banana';

  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';

  close(reason: string): void {
    this.reason = reason;
    this.sidenav.close();
  }

}


