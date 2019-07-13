import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData, AddProvider } from '../../actor.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.scss']
})
export class ViewDialogComponent implements OnInit {
  imagePreview:string;

  constructor(
    public dialogRef: MatDialogRef<ViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: { data: AddProvider,role: string},
  ) { }

  ngOnInit() {
    this.imagePreview=environment.url+this.data.data.photo;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
