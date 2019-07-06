import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { navigation } from 'app/navigation/navigation';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.scss']
})
export class AddActorComponent implements OnInit {
  latitude:number;
  longitude:number;
  availableDays:string;
  availableSlots:string[];
  availabilityArr=[];
  loadedActor:string;
  title:string;
  dupCheck: any;
  dayDupCheck: any;
    constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap=>{
     let actor=paramMap.get('newactor')
      console.log(actor);
      this.dupCheck=navigation[1].children.find(el=>{
        console.log(el.id);
       return el.id == actor;
      });
       if(!actor || this.dupCheck==null){
         this.router.navigateByUrl('/dashboard')
       }
      this.loadedActor=actor;
      // this.title= this.loadedActor[0].toUpperCase()+this.loadedActor.slice(1);
      this.title=this.loadedActor.toLowerCase().replace("-"," ")
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

    })
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos=>{
        console.log(typeof pos.coords.latitude)
        this.latitude=pos.coords.latitude;
        this.longitude=pos.coords.longitude;
      })
    }
    else{
      alert('Getting Current Position Automatically Failed...!');
    }
  }
availability(){
  console.log(this.availableDays,this.availableSlots);
  // this.availableSlots.unshift(this.availableDays)
  this.dayDupCheck=this.availabilityArr.find(el=>{
    console.log(el.availableDays);
    return el.availableDays==(this.availableDays && 'Everyday') ;
  })
  if(this.dayDupCheck==null){
 this.availabilityArr.push({
  availableDays:this.availableDays,
  availableTimes:this.availableSlots
});
}
else{
  console.log(this.dayDupCheck)
  alert('Slot scheduling for this day is already done..')
}
 console.log(this.availabilityArr)
 this.availableDays='';
 this.availableSlots=[];
}
}
