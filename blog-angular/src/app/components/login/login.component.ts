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
  public entity: {};
  userService: UserService = inject(UserService);


  constructor() {
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.status = 'error';
    this.token = '';
    this.entity = {};
  }

  onSubmit(form: any) {
    this.userService.login(this.user).then(response => {
      if (response.status) {
        this.status = 'success';

        this.token = response.token;
        this.entity = {
          id: response.id,
          name: response.name,
          surname: response.surname,
          email: response.mail
        }

      } else {
        this.status = 'error';
      }
    }).catch(error => {
      this.status = 'error';
    });
  }

}
