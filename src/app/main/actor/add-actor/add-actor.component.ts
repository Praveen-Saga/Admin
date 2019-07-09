import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { navigation } from 'app/navigation/navigation';
import { AddProvider, Availability, HealthProvider } from '../actor.model';
import { ActorService } from '../actor.service';

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
  // availabilityArr:Availability[];
  loadedActor:string;
  title:string;
  dupCheck: any;
  dayDupCheck: any;
  imagePreview: string;
  finding: HealthProvider;
  addActor: AddProvider={
    providerId: '',
    name: '',
    qualification: '',
    speciality: '',
    experience: null,
    language: '',
    slots: [],
    address: '',
    latitude: null,
    longitude: null,
    photo: null,
    gender: '',
    phone: null,
    email: ''
  }


    constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private actorServ: ActorService,
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

    this.actorServ.getAllProviders().subscribe(res=>{
      console.log(res);
      this.finding=res.find(el=>{
        return el.providerName==this.loadedActor
      })
      console.log(this.finding,this.finding._id)
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

  imagePicked( event){
    const file= (event.target as HTMLInputElement).files[0]
    const fileReader= new FileReader;
    fileReader.onload=()=>{
      this.imagePreview=(fileReader.result as string);
    }
    fileReader.readAsDataURL(file);
    this.addActor.photo=file
  }

availability(){
  console.log(this.availableDays,this.availableSlots);
  // this.availableSlots.unshift(this.availableDays)
  this.dayDupCheck=this.addActor.slots.find(el=>{
    console.log(el.availableDays);
    return el.availableDays==(this.availableDays && 'Everyday') ;
  })
  if(this.dayDupCheck==null){
 this.addActor.slots.push({
  availableDays:this.availableDays,
  availableTimes:this.availableSlots
});
}
else{
  console.log(this.dayDupCheck)
  alert('Slot scheduling for this day is already done..')
}
 console.log(this.addActor.slots)
 this.availableDays='';
 this.availableSlots=[];
}

submit(){
  this.addActor.providerId=this.finding._id;
  console.log(this.addActor);
  this.actorServ.addProvider(this.addActor);
}
}
