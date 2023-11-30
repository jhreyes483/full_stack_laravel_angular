import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [UserService]
})
export class RegisterComponent {
  page_title      : string = 'Registrate';
  public user     : User;
  public status   : string;
  public isSubmit : boolean;

  constructor(
    private _userService : UserService
  ) {
    this.status   = '';
    this.isSubmit = false;
    this.user      = new User(1, '', '', 'ROLE_USER', '', '', '', '');

  }

  onSubmit(form: any) {
    this.isSubmit = true;
    this._userService.register(this.user).then(response => {
      console.log('ok', response)
        if(response.status == 'success'){
          this.status = 'success';
          form.reset();
        }else{
          this.status = 'error';
        }
    }).catch(error => {
      this.status = 'error';
    });
  }

}
