import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blog_angular_retrocompatible';
  public identity : any ;
  public token    : any ;
  public url      : string;

  constructor(
    _userService : UserService
  ){
    this.identity = _userService.getClearIdentity();
    this.token    = _userService.getToken();
    this.url      = _userService.base_url;
  }

}
