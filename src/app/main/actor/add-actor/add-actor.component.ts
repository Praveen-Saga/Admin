import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.scss']
})
export class AddActorComponent implements OnInit {
  availableDays:string;
  availableSlots:string;
  availabilityObj={};
  availabilityArr=[];
  constructor() { }

  ngOnInit() {
  }
availability(){
  console.log(this.availableDays,this.availableSlots);
  this.availabilityObj[this.availableDays]=this.availableSlots;
 this.availabilityArr.push(this.availabilityObj);
 console.log(this.availabilityArr)
 this.availabilityObj={};
 this.availableDays='';
 this.availableSlots='';
}
}
