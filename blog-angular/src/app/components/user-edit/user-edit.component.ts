import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule,  ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  public page_title :string;
  public status : string;
  public user : User;


  constructor(){
    this.page_title = 'Ajustes';
    this.status = '';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  onSubmit(form : any){
    
  }

}
