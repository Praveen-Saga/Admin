import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../actor/material.module';

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
        MaterialModule
    ],
    exports:[
        DashboardComponent,
       
    ]
   
})
export class DashBoardModule
{
}