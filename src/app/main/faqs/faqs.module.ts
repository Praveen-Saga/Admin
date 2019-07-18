import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FaqsComponent } from './faqs.component';

const routes = [
    {
        path     : '',
    component:FaqsComponent
        
    },  
];

@NgModule({
    declarations: [
      
    FaqsComponent
],
    imports     : [
        RouterModule.forChild(routes),
        FormsModule,
    ],
    exports:[
    FaqsComponent,
       
    ]
   
})
export class FaqsModule
{
}