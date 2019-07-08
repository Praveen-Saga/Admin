import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddActorComponent } from './add-actor/add-actor.component';
import { ViewActorComponent } from './view-actor/view-actor.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule, MatTableModule, MatIconModule, MatPaginatorModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CreateActorComponent } from './create-actor/create-actor.component';
import { CreateSlotComponent } from './create-slot/create-slot.component';
import { CommonModule } from '@angular/common';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatDialogModule} from '@angular/material/dialog';
import { ViewDialogComponent } from './view-actor/view-dialog/view-dialog.component';
import { EditDialogComponent } from './view-actor/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './view-actor/delete-dialog/delete-dialog.component';


const Material=[
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule
]

const routes = [
    {
        path     : '',
        children:[
            {
                path:'create-actor',
                component:CreateActorComponent
            },
            {
                path:'create-slot',
                component:CreateSlotComponent
            },
            {

                path : 'add/:newactor',
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
    ViewActorComponent,
    CreateActorComponent,
    CreateSlotComponent,
    ViewDialogComponent,
    EditDialogComponent, 
    DeleteDialogComponent
],
    imports     : [
        CommonModule,
        RouterModule.forChild(routes),
        NgxMaterialTimepickerModule,

        FormsModule,
        Material,
    ],
    exports:[
       
    ],
    entryComponents:[
        ViewDialogComponent,
        EditDialogComponent, 
        DeleteDialogComponent
    ]
   
})
export class ActorModule
{
}