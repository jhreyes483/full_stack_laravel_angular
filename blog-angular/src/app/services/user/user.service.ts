import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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
