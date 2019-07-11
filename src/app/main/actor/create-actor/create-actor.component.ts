import { Component, OnInit } from '@angular/core';
import { ActorService } from '../actor.service';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.scss']
})
export class CreateActorComponent implements OnInit {
  Master:string;
  constructor(private actorServ:ActorService) { }

  ngOnInit() {
  }

  submit(){
    if(this.Master){
    console.log(this.Master);
    let newRole=this.Master.replace(/\s+/g, " ");
    console.log(newRole);
    this.actorServ.createNewActor(newRole);
    }
  }
}
