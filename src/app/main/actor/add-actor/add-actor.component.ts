import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.scss']
})
export class AddActorComponent implements OnInit {
  availableDays:string;
  availableSlots:string[];
  // availabilityObj={
  //   Availability:null
  // };
  availabilityArr=[];
  constructor() { }

  ngOnInit() {
  }
availability(){
  console.log(this.availableDays,this.availableSlots);
  // {
  //   Availability:this.availableSlots
  // }
  this.availableSlots.unshift(this.availableDays)
 this.availabilityArr.push({
  Availability:this.availableSlots
});
 console.log(this.availabilityArr)
//  this.availabilityObj={
//    Availability:null
//  };
 this.availableDays='';
 this.availableSlots=[];
}
}
