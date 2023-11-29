import { Component ,  DoCheck /** Recarga automatica */} from '@angular/core';
import { UserService } from './services/user/user.service';
import { CategoryService } from './services/category/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public title      = 'Blog-Angular';
  public token      : any;
  public identity   : any;
  public url        : string;
  public status     : string = '';
  public categories : any ;


  constructor(
    private _userService : UserService,
    private _categoryService : CategoryService
  ){
    this.loadUser();
    this.identity = _userService.getIdentity();
    this.token    = _userService.getToken();
    this.url      = _userService.base_url;
  }

  ngOnInit(){
    this.getCategories();
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token    = this._userService.getToken();
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
