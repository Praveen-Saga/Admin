import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PushNotificationsComponent } from './push-notifications.component';

const routes = [
    {
        path     : '',
        component:PushNotificationsComponent
        
    },  
];

@NgModule({
    declarations: [
        PushNotificationsComponent,
      
    ],
    imports     : [
        RouterModule.forChild(routes),
        FormsModule,
    ],
    exports:[
        PushNotificationsComponent,
       
    ]
   
})
export class PushNotificationsModule
{
}