import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { ScrumboardService } from './scrumboard.service';
import { Board } from './board.model';
import { navigation } from 'app/navigation/navigation';
import { HealthProvider } from '../actor/actor.model';
import { ActorService } from '../actor/actor.service';
import { FuseNavigation } from '@fuse/types';

@Component({
    selector     : 'scrumboard',
    templateUrl  : './scrumboard.component.html',
    styleUrls    : ['./scrumboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ScrumboardComponent implements OnInit, OnDestroy
{
    projectBoards: FuseNavigation[];
    userBoards: FuseNavigation[];
    alertBoards: FuseNavigation[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {Router} _router
     * @param {ScrumboardService} _scrumboardService
     */
    constructor(
        private  _router: Router,
        private _scrumboardService: ScrumboardService,
        private actorServ: ActorService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // this._scrumboardService.onBoardsChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(boards => {
        //         this.boards = boards;
        //     });
       
        this.projectBoards=navigation[0].children[1].children;
        this.userBoards=navigation[1].children;
        this.alertBoards=navigation[2].children;
        // this.projectBoards.shift();

        // Getting Providers and Providers count to Dashboard
            this.actorServ.getAllProviders().subscribe(res=>{
                res.forEach(provider=>{
                        // console.log(provider.providerName,count)
                        this.userBoards.forEach(board=>{
                            if(provider.providerName===board.id){
                    this.actorServ.providerWiseCount(provider._id).subscribe(count=>{
                            console.log(board)
                            board.badge.count=count;
                        },
                        err=>{
                            this.actorServ.errHandler(err);
                        })
                    }
                })
                })
            },
            err=>{
                this.actorServ.errHandler(err)
            })
        // Getting Providers and Providers count to Dashboard
           
        // Removing Dashboard Page from the Project Boards
           this.projectBoards= this.projectBoards.filter(el=>{
                return el.id!=='dashboard';
            })
        console.log(this.projectBoards,this.userBoards)



    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * New board
     */
    newBoard(): void
    {
        const newBoard = new Board({});
        this._scrumboardService.createNewBoard(newBoard).then(() => {
            this._router.navigate(['/apps/scrumboard/boards/' + newBoard.id + '/' + newBoard.uri]);
        });
    }
}
