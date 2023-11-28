// https://github.com/ganatan/angular-app/tree/master

import { Component , OnInit, DoCheck} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/user/user.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
  ],
  providers: [UserService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, DoCheck {
  public title = 'Blog-Angular';
  public token : any;
  public identity : any;

  constructor(
    public _userService: UserService
  ) {
    this.loadUser();
  }

  ngOnInit(): void {
    this.loadUser();
  }
  ngDoCheck(): void {
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
