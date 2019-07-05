import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatTableModule, MatIconModule, MatPaginatorModule } from "@angular/material";
import { NgModule } from '@angular/core';

const Material=[
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule
]

@NgModule({
    imports:[
        Material
    ],
    exports:[
        Material
    ]
})
export class MaterialModule
{
}