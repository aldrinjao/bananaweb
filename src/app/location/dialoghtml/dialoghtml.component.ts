import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../components/dashboard/dashboard.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-dialoghtml',
  templateUrl: './dialoghtml.component.html',
  styleUrls: ['./dialoghtml.component.css']
})
export class DialoghtmlComponent {

  myGroup: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<DialoghtmlComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

    this.myGroup = new FormGroup({
      farmNameForm: new FormControl()
    });

  }

  OnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  validate(event): void {
  }

}
