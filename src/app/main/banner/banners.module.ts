import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BannerComponent } from './banner.component';

const routes = [
    {
        path     : '',
        component: BannerComponent
        
    },  
];

@NgModule({
    declarations: [
      BannerComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FormsModule,
    ],
    exports:[
      BannerComponent       
    ]
   
})
export class BannersModule
{
}