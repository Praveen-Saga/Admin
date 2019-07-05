import { Component, OnInit } from '@angular/core';
import { CreateActorService } from './create-actor.service';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.scss']
})
export class CreateActorComponent implements OnInit {
  Master:string;
  constructor(private actorServ:CreateActorService) { }

  ngOnInit() {
  }

  submit(){
    console.log(this.Master);
    this.actorServ.createNewActor(this.Master);
  }
}
