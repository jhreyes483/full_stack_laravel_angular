import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
//import { User } from '../../models/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [UserService, PostService]
})
export class ProfileComponent implements OnInit {
  public url: string;
  public user: any;
  public identity: any;
  public posts: any;
  public page_title: any;
  constructor(
    private _userService: UserService,
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {

    this.url = this._userService.base_url;
    this.identity = this._userService.getIdentity();
    this.page_title = 'Publicaciones';
    // this.user      = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }


  ngOnInit(): void {
    this.getPostByUser()
  }

  getPostByUser() {
    this._route.params.subscribe(params => { /* extrae el id de la categoria desde la url */
      let id = +params['id']

      this._userService.getPostByUser(id).then(response => {
        response = response.data;
        if (response.status == 'success') {
          this.posts = response.posts;
        } else {
          this._router.navigate(['inicio']);
        }
      }).catch(error => {
        console.log(error);
        this._router.navigate(['inicio']);
      });
    });
  }

  deletePost(id: any) {
    this._postService.delete(id).then(response => {
      response = response.data;
      if (response.status == 'success') {
        this.posts = response.posts
        this.getPostByUser()
        console.log(this.posts, 'posts');
      } else {

      }
    }).catch(error => {
      console.log(error, 'error')
    });
  }


}
