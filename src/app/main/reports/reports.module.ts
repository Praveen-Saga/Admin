import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReportsComponent } from './reports.component';

const routes = [
    {
        path     : '',
        component:ReportsComponent
        
    },  
];

@NgModule({
    declarations: [
        ReportsComponent,
      
    ],
    imports     : [
        RouterModule.forChild(routes),
        FormsModule,
    ],
    exports:[
        ReportsComponent,
       
    ]
   
})
export class ReportsModule
{
}