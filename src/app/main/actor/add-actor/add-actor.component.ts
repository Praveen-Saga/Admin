import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { navigation } from 'app/navigation/navigation';
import { AddProvider,  HealthProvider, Qualification, Slots } from '../actor.model';
import { ActorService } from '../actor.service';

import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.scss']
})
export class AddActorComponent implements OnInit {
  @ViewChild("myFilePicker",{static: true}) filePickerRef: ElementRef;

  latitude:number;
  longitude:number;
  availableDays:string;
  availableSlots:string[];
  // availabilityArr:Availability[];
  @Input() role: string; 
  loadedActor:string;
  loadedFile: File;
  title:string;
  dupCheck: any;
  dayDupCheck: any;
  imagePreview: string;
  finding: HealthProvider;
  @Input() editData:AddProvider;
  @Output() filePicker = new EventEmitter()
  Qualifications:Qualification[]=[];
  slots:Slots[]=[];
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
  dayDupCheck2: any;


    constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private actorServ: ActorService,
  ) { }

  ngOnInit() {

  // Identifying for which provider add Page belongs    
    this.activatedRoute.paramMap.subscribe(paramMap=>{
     let actor=paramMap.get('newactor')
     if(this.role && this.role!==''){
       actor=this.role;
       this.addActor=this.editData;
     }
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
  // Identifying for which provider add Page belongs

// Getting Qualifications of Providers
    this.actorServ.getAllProviders().subscribe(res=>{
      console.log(res);
      this.finding=res.find(el=>{
        return el.providerName==this.loadedActor
      })
      console.log(this.finding,this.finding._id)
      this.actorServ.getQualifications(this.finding._id).subscribe(res=>{
        console.log(res);
        this.Qualifications=res;
      },
      err=>{
        this.actorServ.errHandler(err);
      })
    },
    err=>{
     this.actorServ.errHandler(err);
    })
// Getting Qualifications of Providers

// Getting Slots
    this.actorServ.getSlots().subscribe(res=>{
      console.log(res);
      // this.slots=res;
      res.forEach(el=>{
        let slot:Slots={
          fromtime:el.fromtime,
          totime:el.totime,
          slotValue:el.fromtime+" to "+el.totime
        }
        this.slots.push(slot);
      })
    },
    err=>{
      this.actorServ.errHandler(err);
    })
// Getting Slots

// Geolocator
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos=>{
        console.log(pos.coords.latitude)
        this.addActor.latitude=pos.coords.latitude;
        this.addActor.longitude=pos.coords.longitude;
      },
      err=>{
        alert('Getting Current Position Automatically Failed...'+err)
      },
      {
        timeout:10000
      }
      )
    }
    // else{
    //   alert('Getting Current Position Automatically Failed...!');
    // }
  }
// Geolocator

// ImagePicker and file preview
  imagePicked( event){
    const file= (event.target as HTMLInputElement).files[0]
    const fileReader= new FileReader;
    fileReader.onload=()=>{
      this.imagePreview=(fileReader.result as string);
    }
    fileReader.readAsDataURL(file);
    this.loadedFile=file
    console.log(this.loadedFile)
    this.filePicker.emit(this.loadedFile);
  }
// ImagePicker and file preview

// Availability and Slots
availability(){
  console.log(this.availableDays,this.availableSlots);
  // this.availableSlots.unshift(this.availableDays)
  if(this.availableDays && this.availableSlots && this.availableDays!==null && this.availableSlots!==[]){
    console.log(this.addActor.slots)
  // if(this.availableDays=='Everyday'){   
  // this.dayDupCheck=this.addActor.slots.find(el=>{
  //   console.log(el.availableDays);
  //   return el.availableDays=='Everyday'|| el.availableDays==this.availableDays ;
  // })

  if(this.availableDays=='Everyday'){
    if(this.addActor.slots.length<1){
      this.addActor.slots.push({
        availableDays:this.availableDays,
        availableTimes:this.availableSlots
      });
    }else{
      alert("Not Possible to Select Everyday Now..");
    }
  }
  else if(this.availableDays=='Monday to Saturday'){
    this.dayDupCheck2=this.addActor.slots.filter(el=>{
      return el.availableDays!=='Sunday';
    })
    console.log(this.dayDupCheck2)
    if(this.dayDupCheck2==null || this.dayDupCheck2.length<1){
      this.addActor.slots.push({
        availableDays:this.availableDays,
        availableTimes:this.availableSlots
      });
    }else{
      alert('Not Possible to Select '+this.availableDays+' Now..')
    }
  }
  else{
    if(this.availableDays=="Sunday"){
      this.dayDupCheck=this.addActor.slots.find(el=>{
        console.log(el.availableDays);
        return el.availableDays=='Everyday' || el.availableDays=='Sunday' ;
        
      })
      if(this.dayDupCheck==null){
        this.addActor.slots.push({
          availableDays:this.availableDays,
          availableTimes:this.availableSlots
        }
        );
    }
    else{
      console.log(this.dayDupCheck)
      alert('Slot scheduling for this'+this.availableDays+' is already done..')
    }

    }else{
      this.dayDupCheck=this.addActor.slots.find(el=>{
        console.log(el.availableDays);
        return el.availableDays=='Everyday' || el.availableDays=='Monday to Saturday' || el.availableDays==this.availableDays ;
      })
      if(this.dayDupCheck==null){
        this.addActor.slots.push({
          availableDays:this.availableDays,
          availableTimes:this.availableSlots
        }
        );
    }
    else{
      console.log(this.dayDupCheck)
      alert('Slot scheduling for this '+this.availableDays+' is already done..')
    }
    }
   
}
 console.log(this.addActor.slots)
 this.availableDays='';
 this.availableSlots=[];
}else{
  alert('Submit Valid Availablity Days and Slots..!')
}
}
// Availability and Slots


// Delete Added slot from Array

Delete(obj){
  let index=this.addActor.slots.findIndex(el=>{
    return el.availableDays=obj.availableDays;
  })
  this.addActor.slots.splice(index,1);
}
// Delete Added slot from Array

// Submit
submit(form:NgForm){
  // console.log(this.addActor)
  if(this.loadedFile){
  let photoTitle=this.addActor.phone.toString().concat(".jpg")
  this.actorServ.imageUpload(photoTitle,this.loadedFile)
  .subscribe(res=>{
      console.log(res);
      this.addActor.providerId=this.finding._id;
      this.addActor.photo="download/"+photoTitle
      console.log(this.addActor);
      this.actorServ.addProvider(this.addActor);
      form.resetForm();
      this.addActor.slots=[];
    this.filePickerRef.nativeElement.value=""
    this.imagePreview="";
  },
  err=>{
    this.actorServ.errHandler(err)
  });
  console.log(this.addActor.phone.toString().concat(".jpg"));
  
 

}else{
  alert('Please upload Photo..!')
}
}
// Submit

}
