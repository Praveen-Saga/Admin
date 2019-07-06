import { FuseNavigation } from '@fuse/types';

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
                icon     : 'assessment',
                url      : '/dashboard',
                // badge    : {
                //     title    : '25',
                //     translate: 'NAV.SAMPLE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            },
           {
                id       : 'create-user',
                title    : 'Create User',
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
            {
                id       : 'push-notifications',
                title    : 'Push Notifications',
                type     : 'item',
                icon     : 'notification_important',
                url      : '/push-notifications',
               
            },
        ],
    },
    {
        id       : 'users',
        title    : 'USERS',
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
    }
];
