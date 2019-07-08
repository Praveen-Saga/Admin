import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-slot',
  templateUrl: './create-slot.component.html',
  styleUrls: ['./create-slot.component.scss']
})
export class CreateSlotComponent implements OnInit {
  fromTime:string;

  constructor() { }

  ngOnInit() {
  }

  submit(){
    console.log(typeof this.fromTime,new Date().toLocaleString());
    for(let i=0;i<this.fromTime.length;i++){
      console.log(this.fromTime[i]);
    }
    console.log(+(this.fromTime[0]+this.fromTime[1]));

  }
}
