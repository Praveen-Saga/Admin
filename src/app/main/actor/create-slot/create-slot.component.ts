import { Component, OnInit } from '@angular/core';
import { totalmem } from 'os';
import { ActorService } from '../actor.service';
import { Slots } from '../actor.model';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-create-slot',
  templateUrl: './create-slot.component.html',
  styleUrls: ['./create-slot.component.scss']
})
export class CreateSlotComponent implements OnInit {
  fromTime:string;
  toTime:string;
  id:string;
  dupcheck:any;
  // i:number=0;
  isLoading:boolean=false;
  slots:Slots[]=[];
  displayedColumns: string[] = [ 'position','fromSlot','toSlot','status','edit'];
  dataSource;
  constructor(
    private actorServ:ActorService,
  ) { }

  ngOnInit() {

   this.getSlotsToTable();
   this.actorServ.getSubscribeSuccess().subscribe(res=>{
     if(res){
       this.getSlotsToTable();
     }
     this.isLoading=false;
   })
  }

  getSlotsToTable(){
    this.isLoading=true;
    this.actorServ.getAllSlots().subscribe(res=>{
      this.isLoading=false;
      console.log(res);
      this.slots=res;
      this.dataSource = new MatTableDataSource<Slots>(res);
    },
    err=>{
      this.isLoading=false;
      this.actorServ.errHandler(err);
    })
  }
  toTimeCal(){
    console.log(this.fromTime);
     this.dupcheck=this.slots.find(el=>{
      return el.fromtime==this.fromTime;
    })
    console.log('DUPCHECK',this.dupcheck);
    // if(!this.dupcheck && this.dupcheck!==null){
      if(this.fromTime && this.fromTime!==null){
        let fromadTime=+(this.fromTime[0]+this.fromTime[1])
        let fromadd=fromadTime+1
        let balanceTime=this.fromTime.slice(2);
        let fromAddStr
        
        if(fromadd==12){
  
          if(balanceTime[4]=='a'){
            balanceTime=balanceTime.replace('a','p');
          }else{
            balanceTime=balanceTime.replace('p','a');
          }
          // fromadd=1;
        }
        if(fromadd==13){
          fromadd=1;
        }
        if(fromadd.toString().length<2){
          fromAddStr="0"+fromadd.toString()
        }else{
          fromAddStr=fromadd.toString();
        }
        console.log(fromAddStr)
        this.toTime=fromAddStr.concat(balanceTime);
        console.log(this.fromTime,this.toTime);
      }
     
    // }
    // else{
    //   alert('Selected Slot is already there..')
    // }
    
  }

  edit(ele){
    console.log(ele)
    this.fromTime=ele.fromtime;
    this.toTime=ele.totime;
    this.id=ele._id;
    // this.submit();
  }


  changeStatus(element){
        if(element.status=='active'){
          element.status='inactive';
        }else{
          element.status='active'
        }
        this.actorServ.updateSlots(element._id,element);
  }


  submit(form?:NgForm){
    if(!this.dupcheck && this.dupcheck!==null){

    if(this.fromTime && this.fromTime!==null){
      this.isLoading=true;
      if(!this.id && this.id==null){
        console.log('POST');
        const slot:Slots={fromtime:this.fromTime,totime:this.toTime}
        console.log(slot);
        this.actorServ.addSlots(slot);
      }
      else{
        console.log('UPDATE',this.id,this.fromTime,this.toTime);
        const slot:Slots={fromtime:this.fromTime,totime:this.toTime}
        console.log(slot);
        this.actorServ.updateSlots(this.id,slot);
       
      }
    
    }else{
      console.log(this.id)
      alert('Please Enter a Valid Time Slot');
    }
   
      

  }else{
    alert('Slot Already Exists..')
  }
  this.id=null;
  this.fromTime=null;
  this.toTime=null;
 console.log(this.id,this.fromTime,this.toTime)

  if(form){
    form.resetForm();
   }
}
}
