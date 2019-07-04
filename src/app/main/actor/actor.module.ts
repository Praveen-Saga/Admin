import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddActorComponent } from './add-actor/add-actor.component';
import { ViewActorComponent } from './view-actor/view-actor.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';


const Material=[
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
]

const routes = [
    {
        path     : '',
        children:[
            {
                path: 'add/:newactor',
                component: AddActorComponent
            },
            {
                path: 'view/:existingactor',
                component:ViewActorComponent
            },
        ]
    },  
];

@NgModule({
    declarations: [
      
    AddActorComponent,
      
    ViewActorComponent],
    imports     : [
        RouterModule.forChild(routes),
        FormsModule,
        Material
    ],
    exports:[
       
    ]
   
})
export class ActorModule
{
}