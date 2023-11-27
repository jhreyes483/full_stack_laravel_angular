import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';


@Component({
  selector: 'register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  page_title: string = 'Registrate';
  public user: User;
  form :any[]=[];

  constructor() {
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  onSubmit( form :any){
    console.log('funcion onSubmit')
  }

}
