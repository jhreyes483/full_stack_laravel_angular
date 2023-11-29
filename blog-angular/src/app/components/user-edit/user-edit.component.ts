import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import {FileUploadComponent } from '../utils/file-upload/file-upload.component';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule,  ReactiveFormsModule, FileUploadComponent ],
  providers:[UserService],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  public page_title :string;
  public status : string;
  public user : User;
  public identity : any;
  public token : string | null;
  public url;
  //public name_image :any;
  //public uploadData: { name_image: string, status_change: boolean };

  constructor(
    private _userServices : UserService
  ){

    this.page_title = 'Ajustes';
    this.status = '';
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken();
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.url =  this._userServices.base_url
  //  this.name_image = 'test_img';
   // this.uploadData = { name_image: '', status_change: false };

    if(this.identity){
      this.user = new User(
        this.identity.id??'', 
        this.identity.name??'',  
        this.identity.surname??'', 
        'ROLE_USER',
         this.identity.email??'', 
         '',
        this.identity.description,
        ''
        );
    }
  }
/*
  onNameImageChange(value: any) {
    // Capturar el valor emitido por el componente hijo
    this.name_image = value;
    console.log('Valor capturado en el padre:', this.name_image);
  }

  onUploadResult(result: { name_image: string, status_change: boolean }) {
    console.log('Objeto actualizado en el padre:', result);
    // Actualizar el objeto en el componente padre si es necesario
    this.uploadData = result;
  }
  */

  onSubmit(form : any){
    
    this._userServices.update(this.user).then(response => {
      console.log('ok', response)
        if(response.status == 'success'){
          this.status = 'success';
          console.log(this.identity,'thisuser');
          if(this.user){
            // actualiza usuario en session
            this.identity = this.user;
            console.log(this.identity,'enttt');
            localStorage.setItem('identity', JSON.stringify(this.identity))
          }
        }else{
          this.status = 'error';
        }
    }).catch(error => {
      this.status = 'error';
    });
  }

}
