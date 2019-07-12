import { Component, OnInit } from '@angular/core';
import { ActorService } from '../actor.service';
import { HealthProvider, Qualification } from '../actor.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-qualification',
  templateUrl: './add-qualification.component.html',
  styleUrls: ['./add-qualification.component.scss']
})
export class AddQualificationComponent implements OnInit {
  providers:HealthProvider[]=[];
  addQualification:Qualification={
    providerId:null,
    qualification:null,
  }

  constructor(
    private actorServ:ActorService
  ) { }

  ngOnInit() {
    this.actorServ.getAllProviders().subscribe(res=>{
      console.log(res);
      res.forEach(el=>{
        let myValue=el._id;
        let myTitle=el.providerName.toLowerCase().replace("-"," ")
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
        this.providers.push({
          _id:myValue,
          providerName:myTitle
        })
      })
      console.log(this.providers)

    },err=>{
      console.log(err);
      alert('An Error Has Occured..! \n'+ JSON.stringify(err.statusText))
    })
  }

  submit(form: NgForm){
    console.log(this.addQualification);
    this.actorServ.addQualification(this.addQualification);
    form.resetForm();
    
  }
}
