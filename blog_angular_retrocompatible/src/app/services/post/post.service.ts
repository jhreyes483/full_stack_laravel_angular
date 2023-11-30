import { Injectable } from '@angular/core';
import { config } from '../config.services';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    public headers: {};
    public base_url: string;

    constructor(
        private _usersService: UserService
    ) {
        this.base_url = config.base_url;
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': _usersService.getToken(),
        }
    }


    async store(post: any) {
        var options = {
            method: 'POST',
            body: JSON.stringify({
                title: post.title,
                content: post.content,
                category_id: post.category_id,
                image: post.image
            }),
            headers: this.headers
        }
        const data = await fetch(this.base_url + 'api/post', options);
        return await data.json() ?? [];
    }

    async getPost(id = null) {
        var url : string = '';
        if(id){
           url = this.base_url + 'api/post/'+id
        }else{
           url = this.base_url + 'api/post'
        }

        var options = {
            method: 'GET',
            headers: this.headers
        }
        const data = await fetch(url, options);
        return await data.json() ?? [];
    }


}

