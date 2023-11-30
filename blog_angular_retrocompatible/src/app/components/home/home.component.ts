import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import { config } from '../../services/config.services'
import { Post } from '../../models/post';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [PostService, UserService]
})
export class HomeComponent {
  public page_title: string;
  public url;
  public posts: any;
  public identity: any;


  constructor(
    private _postService: PostService,
    private _userService: UserService
  ) {
    this.page_title = 'Inicio';
    this.url = config.base_url;
    this.identity = this._userService.getIdentity();

  }
  ngOnInit() {
    this.getPost()

  }

  deletePost(id: any) {
    alert('entro');
    this._postService.delete(id).then(response => {
      console.log(response)
      if (response.status == 'success') {
        //this.status = 'success';
        this.posts = response.posts
        console.log(this.posts, 'posts');
      } else {

      }
    }).catch(error => {
      console.log(error)
    });
  }

  getPost() {
    this._postService.getPost().then(response => {
      console.log(response)
      if (response.status == 'success') {
        //this.status = 'success';
        this.posts = response.posts
        console.log(this.posts, 'posts');
      } else {

      }
    }).catch(error => {
      console.log(error)
    });
  }
}


