// https://www.youtube.com/watch?v=5K10oYJ5Y-E
// https://www.youtube.com/watch?v=uv0F1R6Pb0s
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { config } from '../config.services';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public headers :{};
  public method :string;
  public base_url :string;

  constructor(){
    this.headers = {
      'Content-Type':'application/json',
      'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NCwiZW1haWwiOiJ2aWN0b3JAdmljdG9yLmNvbSIsIm5hbWUiOiJKYXZpZXIgSC4iLCJzdXJuYW1lIjoiUmV5ZXMiLCJpYXIiOjE3MDEwMTU3NDgsImV4cCI6MTcwMTYyMDU0OH0.mqdshi-914ui_9I5_Dr_FMfus_m9hzRZ_h-VOPwDXpM'
    }
    this.method = 'POST'
    this.base_url =  config.base_url;
  
    
  }

 
  async getAll(): Promise<any>{


    var options ={
      method:'GET',
      headers: this.headers
     
    }
// http://127.0.0.1:8000/ https://jsonplaceholder.typicode.com/todos/1
    const data = await fetch(this.base_url+'api/post/', options); 
    return await data.json()??[];
  }


  async register(user : any){
  var options ={
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        name: user.name,
        surname: user.surname,
        password: user.password
      }),
      headers: this.headers
    }
    const data = await fetch(this.base_url+'api/register', options); 
    return await data.json()??[];
  }

  async login(user : any){
    var options ={
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        password: user.password
      }),
      headers: this.headers
    }
    const data = await fetch(this.base_url+'api/login', options); 
    return await data.json()??[];
  }

  
  



  
}
