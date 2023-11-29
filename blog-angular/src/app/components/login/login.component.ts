import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router'; // para parmetros por url

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserService]
})
export class LoginComponent implements OnInit{
  page_title       : string = "Login"
  public user      : User;
  public status    : string;
  public token     : string | null;
  public identity  : any;
  public isSubmit  : boolean;

  //_userService: UserService  = inject(UserService);
  constructor(
    private _router     : Router,
    private _route      : ActivatedRoute,
    private _userService: UserService  
  ) {
    this.isSubmit = false;
    this.status   = 'error';
    this.token    = '';
    this.identity = _userService.getClearIdentity();

    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit(): void {
    // Se ejecuta siempre y cierra sesion solo cuando le llega el parametro sure por la url
    this.loguot();
  }

  onSubmit(form: any) {
    this.status = '';
    this.isSubmit = true;
    this._userService.login(this.user).then(response => {
      if (response.status && response.status != 'error' ) {
        this.status = 'success';
        this.token    = response.token;
        this.identity = {
          id:           response.id,
          name:         response.name,
          surname:      response.surname,
          email:        response.email,
          image:        response.image,
          description : response.description
        }
        this._router.navigate(['inicio'])
        // persistir datos usuario identificado
        if(this.token) localStorage.setItem('token', this.token);
        localStorage.setItem('identity',JSON.stringify(this.identity));
        console.log('Login_correcto')
        
        if( !localStorage.getItem('token') ){
         // this.status = 'error';
        }else{
          this.status = 'success';
          this._router.navigate(['inicio']);
  
        }
      } else {
        this.clearStorage();
        this.status = 'error';
      }
      if(this.status == 'error'){
        this.clearStorage();
        console.log('clear')
      }


    }).catch(error => {
     // this.status = 'error';
    });
  }

  loguot(){
      this._route.params.subscribe(params=>{
        let loguot = +params['sure'];
        if(loguot == 1){
          this.clearStorage()
        }
      })
  }

  clearStorage(){
    localStorage.removeItem('identity')
    localStorage.removeItem('token')
    this.identity = this._userService.getClearIdentity();
    this.token = null;
    console.log('storage clear');
  }



}
