import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  public page_title : string;
  public status     : string;
  public user       : User;
  public identity   : any;
  public token      : string | null;
  public url;

  constructor(
    private _userServices : UserService
  ){

    this.page_title = 'Ajustes';
    this.status     = '';
    this.identity   = this._userServices.getIdentity();
    this.token      = this._userServices.getToken();
    this.user       = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.url        = this._userServices.base_url
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


