// https://www.youtube.com/watch?v=5K10oYJ5Y-E
// https://www.youtube.com/watch?v=uv0F1R6Pb0s
import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  async getAll(): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NCwiZW1haWwiOiJ2aWN0b3JAdmljdG9yLmNvbSIsIm5hbWUiOiJKYXZpZXIgSC4iLCJzdXJuYW1lIjoiUmV5ZXMiLCJpYXIiOjE3MDEwMTU3NDgsImV4cCI6MTcwMTYyMDU0OH0.mqdshi-914ui_9I5_Dr_FMfus_m9hzRZ_h-VOPwDXpM'); 

    var options ={
      method:'GET',
      /*
      body: JSON.stringify({
        tile:'foo',
        body: 'bar',
        user: 1
      }),
      */
      headers: {
        'Content-Type':'application/json',
        'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NCwiZW1haWwiOiJ2aWN0b3JAdmljdG9yLmNvbSIsIm5hbWUiOiJKYXZpZXIgSC4iLCJzdXJuYW1lIjoiUmV5ZXMiLCJpYXIiOjE3MDEwMTU3NDgsImV4cCI6MTcwMTYyMDU0OH0.mqdshi-914ui_9I5_Dr_FMfus_m9hzRZ_h-VOPwDXpM'
      }
    }
// http://127.0.0.1:8000/ https://jsonplaceholder.typicode.com/todos/1
    const data = await fetch('http://127.0.0.1:8000/api/post/', options); 
    return await data.json()??[];
  }

  
  operatingSystems: User[] = [
    {
      id:1,
      name: 'Pedro',
      surname: 'Daza',
      role: 'ROLE_ADMIN',
      email: 'pedro@gmial.com',
      password: 'password',
      description: 'nada',
      image: 'fsda.jpg'
    },
    {
      id:2,
      name: 'Javier',
      surname: 'Neira',
      role: 'ROLE_ADMIN',
      email: 'javier@gmial.com',
      password: 'password',
      description: 'nada',
      image: 'fsda.jpg'
    },
    {
      id:1,
      name: 'Maria',
      surname: 'Neira',
      role: 'ROLE_ADMIN',
      email: 'maria@gmial.com',
      password: 'password',
      description: 'nada',
      image: 'fsda.jpg'
    }
  ];

  constructor() { }

  getUsers(): User[]{
    return this.operatingSystems;
  }

}
