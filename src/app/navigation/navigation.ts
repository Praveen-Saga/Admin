import { FuseNavigation } from '@fuse/types';
import { CreateActorService } from 'app/main/actor/create-actor/create-actor.service';

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
            // {
            //     id:'doctor',
            //     title:'Doctor',
            //     type:'collapsable',
            //     icon: '',
            //     children:[
            //         {
            //             id:'add',
            //             title:'Add New',
            //             type:'item',
            //             url:'/actor/add/doctor'
            //         },
            //         {
            //             id:'view',
            //             title:'View Existing',
            //             type:'item',
            //             url:'/actor/view/doctor'
            //         },
            //     ]
            // }
        ]
    }
];
