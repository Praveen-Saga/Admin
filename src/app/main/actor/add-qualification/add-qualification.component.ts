import { Component, OnInit } from '@angular/core';
import { ActorService } from '../actor.service';

@Component({
  selector: 'app-add-qualification',
  templateUrl: './add-qualification.component.html',
  styleUrls: ['./add-qualification.component.scss']
})
export class AddQualificationComponent implements OnInit {
  providers:string[]=[];
  

  constructor(
    private actorServ:ActorService
  ) { }

  ngOnInit() {
    this.actorServ.getAllProviders().subscribe(res=>{
      console.log(res);
      res.forEach(el=>{
        let myTitle=el.providerName.toLowerCase().replace("-"," ")
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
        this.providers.push(myTitle)
      })
    },err=>{
      console.log(err);
      alert('An Error Has Occured..! \n'+ JSON.stringify(err.statusText))
    })
  }

}
