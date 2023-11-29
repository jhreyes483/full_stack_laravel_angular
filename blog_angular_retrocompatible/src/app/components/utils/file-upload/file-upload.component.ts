// https://www.itsolutionstuff.com/post/angular-17-file-upload-tutorial-exampleexample.html
import { Component,inject,  Input,  Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
// ../../services/user/user.service

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule] ,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  @Input() apiUrl: string = ''; // Recibe la URL como entrada
  @Input() itemId: string = ''; // Recibe el ID como entrada
  @Output() uploadResult = new EventEmitter<{ status: string, fileName: string }>(); // Emite el resultado
  
public file_one : any;

  myForm      = new FormGroup({
    file:       new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  //public userService: UserService = inject(UserService);
 // public http: HttpClient = inject(HttpClient);
  
  constructor(
   private _userServer :UserService
    ) {

     }

  get f(){
    return this.myForm.controls;
  }
    
  onFileChange(event:any) {
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file_one = file;
      this.myForm.patchValue({
        fileSource: file
      });
    }
  } 

  submit(){
    const formData = new FormData();
    const fileSourceValue = this.myForm.get('fileSource')?.value;
  
    if (fileSourceValue !== null && fileSourceValue !== undefined) {
        formData.append('file0',  fileSourceValue);
    }
    this.uploadFile(this._userServer.getToken())
    .then(data => {
      if(data.status== 'success'){
        this.uploadResult.emit({ status: 'success', fileName: data.image });
      }
    })
    .catch(error => {
      this.uploadResult.emit({ status: 'error', fileName: 'error al subir' });
      console.error('Error en la solicitud:', error);
    });
  }

  async uploadFile( token : any) {
    const url       = this._userServer.base_url + this.apiUrl;
    const formData  = new FormData();
    formData.append('file0', this.file_one);
  
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': token,
      }

    });
  
    return response.json();
  }

}