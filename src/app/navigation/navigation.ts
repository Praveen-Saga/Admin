import { FuseNavigation } from '@fuse/types';
import { OnInit } from '@angular/core';
import { ActorService } from 'app/main/actor/actor.service';
import { count } from 'rxjs/operators';

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
                id: 'masters',
                title: 'Masters',
                type: 'collapsable',
                icon: 'layers',
                children:[
                    {
                        id       : 'create-health-provider',
                        title    : 'Health Providers Master',
                        type     : 'item',
                        icon     : 'add',
                        url      : '/actor/create-actor',
                       
                    },
                    {
                        id       : 'create-slot',
                        title    : 'Slots Master',
                        type     : 'item',
                        icon     : 'access_time',
                        url      : '/actor/create-slot',
                       
                    },
                    {
                        id       : 'add-qualification',
                        title    : 'Qualifications Master',
                        type     : 'item',
                        icon     : 'school',
                        url      : '/actor/add-qualification',
                        
                       
                    },
                  
                ]
            },
            {
                id       : 'users',
                title    : 'Users',
                type     : 'item',
                icon     : 'group',
                url      : '/actor/users',
                badge    :{
                count    : 0,
                title:'',
                }
               
            },
            {
                id       : 'appointments',
                title    : 'Appointments',
                type     : 'item',
                icon     : 'group',
                url      : '/actor/appointments',
               
            },
          
        ],
    },
    {
        id       : 'health-providers',
        title    : 'HEALTH PROVIDERS',
        // translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            // {
            //     id:'doctor',
            //     title:'Doctor',
            //     type:'collapsable',
            //     icon: '',
            //     children:[
            //         {
            //             id:'add',
            //             title:'Add New Doctor',
            //             type:'item',
            //             url:'/actor/add/doctor'
            //         },
            //         {
            //             id:'view',
            //             title:'View Registered Doctors',
            //             type:'item',
            //             url:'/actor/view/doctor'
            //         },
            //     ]
            // },
            // {
            //     id:'nurse',
            //     title:'Nurse',
            //     type:'collapsable',
            //     icon: '',
            //     children:[
            //         {
            //             id:'add',
            //             title:'Add New Nurse',
            //             type:'item',
            //             url:'/actor/add/nurse'
            //         },
            //         {
            //             id:'view',
            //             title:'View Registered Nurse',
            //             type:'item',
            //             url:'/actor/view/nurse'
            //         },
            //     ]
            // },
            // {
            //     id:'medical-store',
            //     title:'Medical Store',
            //     type:'collapsable',
            //     icon: '',
            //     children:[
            //         {
            //             id:'add',
            //             title:'Add New Medical Store',
            //             type:'item',
            //             url:'/actor/add/medical-store'
            //         },
            //         {
            //             id:'view',
            //             title:'View Registered Medical Stores',
            //             type:'item',
            //             url:'/actor/view/medical-store'
            //         },
            //     ]
            // },
            // {
            //     id:'transport-service',
            //     title:'Transport Service',
            //     type:'collapsable',
            //     icon: '',
            //     children:[
            //         {
            //             id:'add',
            //             title:'Add New Transport Service',
            //             type:'item',
            //             url:'/actor/add/transport-service'
            //         },
            //         {
            //             id:'view',
            //             title:'View Registered Transport Services',
            //             type:'item',
            //             url:'/actor/view/transport-service'
            //         },
            //     ]
            // },
            
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
                icon     : 'sms',
                url      : '/push-notifications',
             },
             {
                id       : 'news',
                title    : 'News',
                type     : 'item',
                icon     : 'markunread',
                url      : '/news',
             },
             {
                id       : 'feedback',
                title    : 'Feedback',
                type     : 'item',
                icon     : 'feedback',
                url      : '/feedback',
             },
             {
                id       : 'faqs',
                title    : 'FAQs',
                type     : 'item',
                icon     : 'forum',
                url      : '/faqs',
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