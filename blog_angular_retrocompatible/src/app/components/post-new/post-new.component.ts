import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrl: './post-new.component.css',
  
})
export class PostNewComponent {
  public page_title: string;
  public status: string;
  public identity: any;
  public token: any;
  public post: any;
  public categories: any;
  public user: any;
  public url : string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private  _userServices : UserService,
    private _categoryService: CategoryService
  ){

    this.page_title = 'Nueva entrada';
    this.status = '';
    this.identity = _userServices.getIdentity();
    this.token = this._userServices.getToken();
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.url =  this._userServices.base_url
  //  this.name_image = 'test_img';
   // this.uploadData = { name_image: '', status_change: false };

    if(this.identity){
      this.user = new User(
        this.identity.id??'', 
        this.identity.name??'',  
        this.identity.surname??'', 
        'ROLE_USER',
         this.identity.email??'', 
         '',
        this.identity.description,
        ''
        );
    }
  }

  onSubmit(form : any){
    
    this._userServices.update(this.user).then(response => {
      console.log('ok', response)
        if(response.status == 'success'){
          this.status = 'success';
          console.log(this.identity,'thisuser');
          if(this.user){
            // actualiza usuario en session
            this.identity = this.user;
            console.log(this.identity,'enttt');
            localStorage.setItem('identity', JSON.stringify(this.identity))
          }
        }else{
          this.status = 'error';
        }
    }).catch(error => {
      this.status = 'error';
    });
  }
}
