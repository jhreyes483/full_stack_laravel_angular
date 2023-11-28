import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserService]
})
export class LoginComponent {
  page_title: string = "Login"
  public user: User;
  public status: string;
  public token: string;
  public identity: {
    id:string,
    name:string,
    surname:string,
    email:string
  };
  userService: UserService = inject(UserService);


  constructor() {
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.status = 'error';
    this.token = '';
    this.identity = {id:'',name:'',surname:'',email:''};
  }

  onSubmit(form: any) {
    this.userService.login(this.user).then(response => {
      if (response.status) {
        

        this.token  = response.token;
        this.identity = {id: response.id,name: response.name,surname: response.surname,email: response.mail}

        // persistir datos usuario identificado
        localStorage.setItem('token', this.token);
        localStorage.setItem('identity',JSON.stringify(this.identity));
        if( !localStorage.getItem('token') ){
          this.status = 'error';
        }else{
          this.status = 'success';
          console.log('Login_correoto')
        }
      } else {
        this.status = 'error';
      }
    }).catch(error => {
      this.status = 'error';
    });
  }

}
