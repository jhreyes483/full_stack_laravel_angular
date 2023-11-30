import { Component } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
  providers: [PostService]
})
export class PostDetailComponent {


  constructor(
    private _postService : PostService
  ){}
}
