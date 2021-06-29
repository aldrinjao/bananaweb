import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
@Injectable()
export class UpdateService {

  snackbar2: MatSnackBar;
  swUpdate2: SwUpdate;

  constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {

    this.swUpdate.available.subscribe(evt => {
      const snack = this.snackbar.open('Update Available', 'Reload', { duration: 60000 });
      snack
        .onAction()
        .subscribe(() => {
          window.location.reload();
        });

      // snack.setTimeout(() => {
      //   snack.dismiss();
      // }, 6000);
    });
  }

  checkUpdates(): void {


    if (this.swUpdate.isEnabled) {
      this.swUpdate2.available.subscribe(evt => {
        const snack = this.snackbar2.open('Update Available', 'Reload', { duration: 60000 });
        snack
          .onAction()
          .subscribe(() => {
            window.location.reload();
          });

        // snack.setTimeout(() => {
        //   snack.dismiss();
        // }, 6000);
      });

    }
  }



}
