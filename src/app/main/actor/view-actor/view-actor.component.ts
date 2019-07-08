import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { navigation } from 'app/navigation/navigation';
import { PeriodicElement } from '../actor.model';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { ViewDialogComponent } from './view-dialog/view-dialog.component';



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
  displayedColumns: string[] = ['position', 'name',  'Speciality','Available time','Available Days','view','edit','delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  loadedActor: string;
  title: string;
  dupCheck: any;

  constructor(
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
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

  delete(){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      // data: 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      // this.animal = result;
    });
  }

  edit(element){
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      // data: 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      // this.animal = result;
    });
  }

  view(element){
    const dialogRef = this.dialog.open(ViewDialogComponent, {
      width: '250px',
      // data: 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      // this.animal = result;
    });
  }
  // }

}
