import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',

})
export class RegisterComponent {
  page_title: string = 'Registrate';
  public user: User;
  userService: UserService = inject(UserService);
  users: User[] = this.userService.getUsers();
  form: any[] = [];

  constructor() {
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  onSubmit(form: any) {

    this.userService.getAll().then(response => {

      console.log('ok', response)
      //console.log(response.userId)

    }).catch(error => {

      console.log('error', error)

    });

    form.reset();

  }

}
