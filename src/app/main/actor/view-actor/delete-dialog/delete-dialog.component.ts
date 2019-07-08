import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../actor.model';

@Component({
  selector: 'app-delete-dialog',
  template: `
  <div mat-dialog-content class='h2'  style='text-align:center'>Are you Sure?</div>

<div mat-dialog-actions style="margin:auto;">
  <button mat-stroked-button (click)="onNoClick()">No Thanks</button>
  <button mat-stroked-button color='warn' class='ok' [mat-dialog-close]="true" cdkFocusInitial>Ok</button>
</div>
  `,
  styles: [`
  .ok{
    margin-left:3rem;
  }
  `]
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
          @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }


  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
