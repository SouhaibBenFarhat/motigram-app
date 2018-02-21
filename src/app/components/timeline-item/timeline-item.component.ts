import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.css']
})
export class TimelineItemComponent implements OnInit {

  @Input() post : Post;
  private myCustomDate : CustomDate = new CustomDate();

  constructor() {

   }

  ngOnInit() {
    let date = new Date(this.post.createdAt);
    this.myCustomDate.day = date.getDate();
    this.myCustomDate.month = date.getMonth();
    this.myCustomDate.year = date.getFullYear();
  }

}

export class CustomDate{
  day:number;
  month:number;
  year:number;
}
