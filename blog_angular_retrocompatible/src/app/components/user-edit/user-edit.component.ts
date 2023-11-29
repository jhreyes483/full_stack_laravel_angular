import { Component ,OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  public page_title    : string;
  public status        : string;
  public user          : User;
  public identity      : any;
  public token         : string | null;
  /******************************* */
  /* varibles de componente hijo upload file */
  public url_anex      : string = 'api/user/upload'; /** varibles de componente upload imagen */
  public id_anex       : string = '0'; /** varibles de componente upload imagen */
  /******************************* */
  public url           : string;
  public froala_options: Object;

  constructor(
    private _userServices : UserService
  ){

    this.page_title = 'Ajustes';
    this.status     = '';
    this.identity   = this._userServices.getIdentity();
    this.token      = this._userServices.getToken();
    this.user       = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.url        = this._userServices.base_url
    this.froala_options = {
      /** configuracion de formulario texto enrriquesido */
      charCounterCount: true,
      toolbarButtons:   ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
      toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
      toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
      placeholderText: this.identity.description
    };
  
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

  ngOnInit(): void {
  }
 
  onSubmit(form : any){
    this.updateUser();
  }

  resposeFromFile(e : any){
    this.user.image = e.fileName
    this.updateUser();
  }

  updateUser(){
    this.user.image = this.identity.image; 
    this._userServices.update(this.user).then(response => {
        if(response.status == 'success'){
          this.status = 'success';
          if(this.user){
            // actualiza usuario en session
            this.identity = this.user;
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


