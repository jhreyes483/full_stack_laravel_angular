import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',

})
export class RegisterComponent {
  page_title: string = 'Registrate';
  public user: User;
  public status: string;

  userService: UserService = inject(UserService);
  users: User[] = [];
  form: any[] = [];

  constructor() {
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.status= '';
  }

  onSubmit(form: any) {
    this.userService.register(this.user).then(response => {
      console.log('ok', response)
        if(response.status == 'success'){
          this.status = response.status;
          form.reset();

        }else{
          this.status = 'error';
        }
    }).catch(error => {
      this.status = 'error';
    });
/*
    this.userService.getAll().then(response => {

      console.log('ok', response)

    }).catch(error => {

      console.log('error', error)

    });

    */



  }

}
