import { FuseNavigation } from '@fuse/types';
import { OnInit } from '@angular/core';
import { ActorService } from 'app/main/actor/actor.service';

export const navigation: FuseNavigation[] = [
    {
        id       : 'project',
        title    : 'PROJECT',
        // translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'dashboard',
                title    : 'DashBoard',
                // translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'dashboard',
                url      : '/dashboard',
                // badge    : {
                //     title    : '25',
                //     translate: 'NAV.SAMPLE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            },
           {
                id       : 'create-health-provider',
                title    : 'Create Health Provider',
                type     : 'item',
                icon     : 'add',
                url      : '/actor/create-actor',
               
            },
            {
                id       : 'create-slot',
                title    : 'Create Slot',
                type     : 'item',
                icon     : 'access_time',
                url      : '/actor/create-slot',
               
            },
          
        ],
    },
    {
        id       : 'health-providers',
        title    : 'HEALTH PROVIDERS',
        // translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id:'doctor',
                title:'Doctor',
                type:'collapsable',
                icon: '',
                children:[
                    {
                        id:'add',
                        title:'Add New Doctor',
                        type:'item',
                        url:'/actor/add/doctor'
                    },
                    {
                        id:'view',
                        title:'View Registered Doctors',
                        type:'item',
                        url:'/actor/view/doctor'
                    },
                ]
            },
            {
                id:'nurse',
                title:'Nurse',
                type:'collapsable',
                icon: '',
                children:[
                    {
                        id:'add',
                        title:'Add New Nurse',
                        type:'item',
                        url:'/actor/add/nurse'
                    },
                    {
                        id:'view',
                        title:'View Registered Nurse',
                        type:'item',
                        url:'/actor/view/nurse'
                    },
                ]
            },
            {
                id:'medical-store',
                title:'Medical Store',
                type:'collapsable',
                icon: '',
                children:[
                    {
                        id:'add',
                        title:'Add New Medical Store',
                        type:'item',
                        url:'/actor/add/medical-store'
                    },
                    {
                        id:'view',
                        title:'View Registered Medical Stores',
                        type:'item',
                        url:'/actor/view/medical-store'
                    },
                ]
            },
            {
                id:'transport-service',
                title:'Transport Service',
                type:'collapsable',
                icon: '',
                children:[
                    {
                        id:'add',
                        title:'Add New Transport Service',
                        type:'item',
                        url:'/actor/add/transport-service'
                    },
                    {
                        id:'view',
                        title:'View Registered Transport Services',
                        type:'item',
                        url:'/actor/view/transport-service'
                    },
                ]
            },
            
        ]
    },
    {
        id       : 'alerts',
        title    : 'ALERTS',
        type     : 'group',
        children : [
            {
                id       : 'reports',
                title    : 'Reports',
                type     : 'item',
                icon     : 'assignment',
                url      : '/reports',
             },
            {
                id       : 'banners',
                title    : 'Banners',
                type     : 'item',
                icon     : 'photo',
                url      : '/banner',
             },
            {
                id       : 'push-notifications',
                title    : 'Push Notifications',
                type     : 'item',
                icon     : 'notification_important',
                url      : '/push-notifications',
             },
        ]
    }
];

export class SideBarNavigation implements OnInit{

    constructor(private actorServ:ActorService){

    }

    ngOnInit(){
        this.actorServ.getAllProviders().subscribe((res)=>{
            console.log(res);
            res.forEach(element => {
            //  let myTitle= element.providerName[0].toUpperCase()+element.providerName.slice(1).toLowerCase();
            });
            
          });
    }
}