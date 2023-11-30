import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/category';
import { config } from '../../services/config.services';
import { CategoryService } from '../../services/category/category.service';
import { UserService } from '../../services/user/user.service';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css',
  providers: [UserService ,CategoryService , PostService]
})
export class CategoryDetailComponent implements OnInit {
  public page_title : string;
  public category   : any;
  public post       : any;
  public posts      : any;
  public url        : any;
  public identity   : any;


  constructor(
    private _route          : ActivatedRoute,
    private _router         : Router,
    private _categorySerice : CategoryService,
    private _userService    : UserService,
    private _postService    : PostService
  ){
    this.page_title = 'Categoria'
    this.url        = config.base_url;
    this.identity   = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.getPostByCategory();
  }

  getPostByCategory(){
    this._route.params.subscribe(params =>{ /* extrae el id de la categoria desde la url */
        let id = +params['id']

      this._categorySerice.getCategory(id).then(response => { /* llamado de category */
        response = response.data;
        console.log('r_category', response)
        if(response.status == 'success'){

          this.category = response.category;

          this._categorySerice.getPost(this.category.id).then(response => {  /* llamado de post */
            response = response.data;
            if(response.status == 'success'){

              this.posts = response.posts;
                //  console.log(response , 'post_category')
         
    
            }else{
              this._router.navigate(['inicio'])
            }
        }).catch(error => {
          console.log('error_category_post',error)
        });
      

        }else{
          this._router.navigate(['/inicio']);
        }
    }).catch(error => {
      console.log('error_category',error)
      this._router.navigate(['/inicio']);
    });

    })
  }

  deletePost(id: any) {
    this._postService.delete(id).then(response => {
      response = response.data;
      if (response.status == 'success') {
        this.posts = response.posts
        this.getPostByCategory();
      } else {

      }
    }).catch(error => {
      console.log(error,'error')
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

