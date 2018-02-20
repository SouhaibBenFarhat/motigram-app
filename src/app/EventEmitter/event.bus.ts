import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventBus {


    public onNewComment = new EventEmitter<any>();



    constructor() { }


    public onNewCommentAdded() {
        this.onNewComment.emit(0);
    }

}