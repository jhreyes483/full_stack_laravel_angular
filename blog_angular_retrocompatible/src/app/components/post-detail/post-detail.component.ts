import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router'; // sacar parametros de url


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {
  public post: any;


  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {


  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    // sacar el id por get
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._postService.getPost(id).then(response => {
        if (response.status == 'success') {

          this.post = response.post;
        } else {

          this._router.navigate(['inicio']);

        }
      }).catch(error => {
        console.log(error);

        this._router.navigate(['inicio']);

      });
    })
  }
}
