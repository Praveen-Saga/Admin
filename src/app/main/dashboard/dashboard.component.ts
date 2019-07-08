import { Component, OnInit } from '@angular/core';
import { ActorService } from '../actor/actor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private actorServ:ActorService,
  ) { }

  ngOnInit() {
    this.actorServ.getAllProviders();
  }


}
