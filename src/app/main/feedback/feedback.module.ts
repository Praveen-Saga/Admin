import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeedbackComponent } from './feedback.component';

const routes = [
    {
        path     : '',
    component:FeedbackComponent,
        
    },  
];

@NgModule({
    declarations: [
      
FeedbackComponent,
],
    imports     : [
        RouterModule.forChild(routes),
        FormsModule,
    ],
    exports:[
FeedbackComponent,
       
    ]
   
})
export class FeedbackModule
{
}