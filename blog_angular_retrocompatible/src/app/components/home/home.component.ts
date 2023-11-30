import { Component , OnInit} from '@angular/core';
import { PostService } from '../../services/post/post.service';
import { config } from '../../services/config.services'
import { Post } from '../../models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public page_title : string ;
  public url;
  public posts : any;

  constructor(
    private _postService : PostService
  ){
    this.page_title = 'Inicio';
    this.url = config.base_url;

  }
  ngOnInit(){
    this.getPost()

  }

  getPost(){
    this._postService.getPost().then(response => {
      console.log(response)
      if(response.status == 'success'){
        //this.status = 'success';
        this.posts = response.posts
        console.log(this.posts, 'posts');
      }else{

      }
  }).catch(error => {
    console.log(error)
  });
  }
}


