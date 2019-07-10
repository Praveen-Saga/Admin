import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData, AddProvider } from '../../actor.model';
import { ActorService } from '../../actor.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {data:AddProvider,role:string},
    // private actorServ:ActorService
  ) { }

  ngOnInit() {
  }

  // update(result){
  //   console.log(result);
  //   this.actorServ.updateProvider(result._id,result);

  // }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
