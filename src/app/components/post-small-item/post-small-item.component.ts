import { Component, OnInit, Input } from '@angular/core';
import { Post } from "../../models/post";

@Component({
  selector: 'app-post-small-item',
  templateUrl: './post-small-item.component.html',
  styleUrls: ['./post-small-item.component.css']
})
export class PostSmallItemComponent implements OnInit {

  @Input() post: Post;


  constructor() { }

  ngOnInit() {
  }

}
