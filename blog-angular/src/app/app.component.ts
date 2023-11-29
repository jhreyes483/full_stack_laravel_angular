// https://github.com/ganatan/angular-app/tree/master

import { Component, OnInit, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/user/user.service';
import { CategoryService } from './services/category/category.service';



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
  public token: any;
  public identity: any;
  public url: string;
  public status: string = '';
  public categories : any ;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.loadUser();
    this.url = this._userService.base_url
  }

  ngOnInit(): void {
    this.loadUser();
    this.getCategories();
  }

  ngDoCheck(): void {
    this.loadUser();
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getCategories() {
    this._categoryService.getCategories().then(response => {

      if (response.status == 'success') {
        this.status = 'success';
        this.categories = response.categories;
      } else {
        this.status = 'error';
      }
    }).catch(error => {
      this.status = 'error';
    });
  }
}
