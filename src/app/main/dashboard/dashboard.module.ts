import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes = [
    {
        path     : '',
        component:DashboardComponent
        
    },  
];

@NgModule({
    declarations: [
        DashboardComponent,
      
    ],
    imports     : [
        RouterModule.forChild(routes),
        FormsModule,
    ],
    exports:[
        DashboardComponent,
       
    ]
   
})
export class DashBoardModule
{
}