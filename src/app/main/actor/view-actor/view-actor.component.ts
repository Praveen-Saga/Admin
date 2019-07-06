import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { navigation } from 'app/navigation/navigation';

export interface PeriodicElement {
  name: string;
  position: number;
  AvailableTime: string;
  AvailableDays: string;
  Speciality: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Bhavani Shankar', AvailableTime:'' ,AvailableDays:'', Speciality: 'Orthopedic'},
  {position: 2, name: 'Helium',  AvailableTime: '',AvailableDays:'', Speciality: 'He'},
  {position: 3, name: 'Lithium', AvailableTime: '',AvailableDays:'', Speciality: 'Li'},
 
];


@Component({
  selector: 'app-view-actor',
  templateUrl: './view-actor.component.html',
  styleUrls: ['./view-actor.component.scss']
})
export class ViewActorComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name',  'Speciality','Available time','Available Days','edit','delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  loadedActor: string;
  title: string;
  dupCheck: any;

  constructor(
    private activatedRoute:ActivatedRoute,
    private router: Router
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      console.log(paramMap)
      let actor=paramMap.get('existingactor')
       console.log(actor);
       this.dupCheck=navigation[1].children.find(el=>{
        console.log(el.id);
       return el.id == actor;
      });
       if(!actor || this.dupCheck==null){
         this.router.navigateByUrl('/dashboard')
       }
       this.loadedActor=actor;
       this.title= 
      //  this.loadedActor[0].toUpperCase()+this.loadedActor.slice(1);
      this.title=this.loadedActor.toLowerCase().replace("-"," ")
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
 
     })
  }

}
