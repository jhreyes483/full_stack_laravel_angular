import { Injectable } from '@angular/core';
import { config } from '../config.services';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})



export class CategoryService {
  public headers: {};
  public base_url: string;


  public token: string | null;
  public identity: any;


  constructor(
    _userService :UserService
    ) {

        this.base_url = config.base_url;
        this.token    = null;
        this.headers  = {
            'Content-Type': 'application/json',
            'Authorization': _userService.getToken(),
        }
    }

    async store(category: any) {
        var options = {
          method: 'POST',
          body: JSON.stringify({
            name: category.name,
          }),
          headers: this.headers
        }
        const data = await fetch(this.base_url + 'api/category', options);
        return await data.json() ?? [];
    }

    async getCategories() {
      var options = {
        method: 'GET',
        headers: this.headers
      }
      const data = await fetch(this.base_url + 'api/category', options);
      return await data.json() ?? [];
  }
    



}