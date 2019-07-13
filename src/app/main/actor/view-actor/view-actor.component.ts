import {Component, OnInit, ViewChild, OnChanges, ɵɵNgOnChangesFeature} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { navigation } from 'app/navigation/navigation';
import { PeriodicElement, HealthProvider, AddProvider, SearchPage } from '../actor.model';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { ViewDialogComponent } from './view-dialog/view-dialog.component';
import { ActorService } from '../actor.service';
import { NgForm } from '@angular/forms';



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
  displayedColumns: string[] = [ 'name',  'email','phone','experience','view','edit','delete'];
  dataSource;
  //  = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  loadedActor: string;
  title: string;
  dupCheck: any;
  finding: HealthProvider;
  search: SearchPage={
    name:null,
    phone:null,
    email:null
  }
  validateObject=[];
  constructor(
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private actorServ: ActorService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    // getting Providers and actor wise list
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
       console.log(this.title);
       this.actorServ.getAllProviders().subscribe(res=>{
        console.log(res);
        this.finding=res.find(el=>{
          return el.providerName==this.loadedActor;
        },
        err=>{
          console.log(err);
          alert('An Error Has Occured...! \n'+JSON.stringify(err.statusText))
        })
        console.log(this.finding,this.finding._id)
        this.getActorsToTable(this.finding._id);
      })
     })
  }
    // getting Providers and actor wise list
 

// Search
  sendSearchData(form: NgForm){
    console.log(this.search);
    if(this.search.phone==null && this.search.name==null && this.search.email==null){
      this.getActorsToTable(this.finding._id);
    }else{
    this.actorServ.searchAmongProviders(this.search).subscribe(res=>{
      console.log(res);
      this.dataSource = new MatTableDataSource<AddProvider>(res);
      this.dataSource.paginator = this.paginator;
    },
    err=>{
      console.log(err);
      alert('An Error Has Occured...! \n'+JSON.stringify(err.statusText))
    })
    form.resetForm();
  }
  }
  getActorsToTable(id){
    this.actorServ.getProviderList(id).subscribe(res=>{
      console.log(res);
     this.dataSource = new MatTableDataSource<AddProvider>(res);
     this.dataSource.paginator = this.paginator;  },
     err=>{
      console.log(err);
      alert('An Error Has Occured...! \n'+JSON.stringify(err.statusText))
    })
  }
// Search

// Delete
  delete(element){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      // data: 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      console.log(element)
      if(result){
        this.actorServ.deleteProvider(element._id).subscribe(res=>{
          console.log(res);
          this.getActorsToTable(this.finding._id)
        },
        err=>{
          console.log(err);
          alert('An Error Has Occured...! \n'+JSON.stringify(err.statusText))
        });
      }
    });
  }
// Delete

// Edit
  edit(element){
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '50%',
      data: {data:element,role:this.loadedActor}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      // Object.keys(result.data).forEach(el=>{
      //   console.log(el,result.data[el]);
      //   if(result.data[el]==null || result.data[el]==''){
      //     this.validateObject.push(el)
      //   }

      // })
      // console.log(this.validateObject)
      if(result){
        if(result.data.slots.length>0){
          let photoTitle=result.data.phone.toString().concat(".jpg")
          console.log(result.loadedFile)
          if(result.loadedFile){
          this.actorServ.imageUpload(photoTitle,result.loadedFile)
          .subscribe(res=>{
            // if(res._id)
          console.log(res);
          this.actorServ.updateProvider(result.data._id,result.data).subscribe(res=>{
            if(res.phone){
              console.log(res); 
              this.getActorsToTable(this.finding._id)
            }else{
              alert('Please Submit a Valid Form')
            }
           
          },
          err=>{
            console.log(err);
            alert('An Error Has Occured...! \n'+JSON.stringify(err.statusText))
          })
        },err=>{
          console.log(err);
          alert('An Error Has Occured...! \n'+JSON.stringify(err.statusText))
        });
      }else{
        this.actorServ.updateProvider(result.data._id,result.data).subscribe(res=>{
          if(res.phone){
            console.log(res); 
            this.getActorsToTable(this.finding._id)
          }else{
            alert('Please Submit a Valid Form')
          }
        },
        err=>{
          console.log(err);
          alert('An Error Has Occured...! \n'+JSON.stringify(err.statusText))
        })
      }
    }else{
      alert('Please Submit a Valid Form');
    }
      }
  
  });
  }
// Edit

// View
  view(element){
    console.log(element.phone);

    const dialogRef = this.dialog.open(ViewDialogComponent, {
      width: '50%',
      data: {data:element,role:this.loadedActor}
     
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      // this.animal = result;
    });
  }
// View

}
