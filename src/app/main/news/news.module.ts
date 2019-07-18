import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewsComponent } from './news.component';

const routes = [
    {
        path     : '',
        component:NewsComponent
        
    },  
];

@NgModule({
    declarations: [
        NewsComponent  ,
      
    ],
    imports     : [
        RouterModule.forChild(routes),
        FormsModule,
    ],
    exports:[
        NewsComponent,
       
    ]
   
})
export class NewsModule
{
}