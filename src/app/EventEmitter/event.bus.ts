import { Injectable, EventEmitter } from '@angular/core';
import { Post } from '../models/post';

@Injectable()
export class EventBus {


    public onNewPostAdded = new EventEmitter<Post>();



    constructor() { }


    public onNewPostTriggerEvent(post: Post) {
        this.onNewPostAdded.emit(post);
    }

    public suscribeToNewPostsevent(): EventEmitter<Post> {
        return this.onNewPostAdded;
    }
}