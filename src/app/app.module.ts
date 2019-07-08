import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { LoginModule } from './main/login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { ActorModule } from './main/actor/actor.module';
import { CommonModule } from '@angular/common';
import { ScrumboardModule } from './main/scrumboard/scrumboard.module';
import { ReportsModule } from './main/reports/reports.module';

// const appRoutes: Routes = [
//     {
//         path      : '',
//         redirectTo: 'login',
//         pathMatch: 'full'
//     }
// ];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,


        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        // ScrumboardModule,
        // App modules
        LayoutModule,
        SampleModule,
        LoginModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
