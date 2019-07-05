import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

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

  constructor() { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
