import { Injectable } from '@angular/core';
import { config } from '../config.services';
import { UserService } from '../user/user.service';
import axios from 'axios';

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
        //Limpia campo content (editor de textto enriquesido)
        post.content = config.htmlEntities(post.content)
        let options = {
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

    async getPost(id : any = null) {
        let url : string = '';
        if(id){
           url = this.base_url + 'api/post/'+id /* solo el detal */
        }else{
           url = this.base_url + 'api/post' /*todos los post*/
        }

        let options = {
            method: 'GET',
            headers: this.headers
        }
        const data = await fetch(url, options);
        return await data.json() ?? [];
    }

    async update(post : any, id: any): Promise<any>  {
        //Limpia campo content (editor de textto enriquesido)
        post.content = config.htmlEntities(post.content )
        console.log(this.base_url+ 'post/' + id)
        let headers = this.headers;
        let data = {
            title: post.title,
            content:  post.content,
            category_id: post.category_id,
            image: post.image
        }
       return  await  axios.put(this.base_url+ 'api/post/' + id, data , { headers });
    }


    async delete(id: any): Promise<any> {
        let headers = this.headers;
        return await  axios.delete(this.base_url+ 'api/post/'+id, { headers });
    }




}

