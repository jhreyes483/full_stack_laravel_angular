// https://www.itsolutionstuff.com/post/angular-17-file-upload-tutorial-exampleexample.html
import { Component,inject,  Input,  Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
// ../../services/user/user.service

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
  
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule] ,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  // importa la varible del componente padre al hijo
 //@Input() name_image : any;
 //@Output() nameImageChange = new EventEmitter<any>();

 //@Input() uploadData: { name_image: string, status_change: boolean };
 //@Output() uploadResult = new EventEmitter<{ name_image: string, status_change: boolean }>();


  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  public userService: UserService = inject(UserService);
  
  constructor(private http: HttpClient) { }

  get f(){
    return this.myForm.controls;
  }
    
  onFileChange(event:any) {
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  } 

  submit(){
    const formData = new FormData();
    const fileSourceValue = this.myForm.get('fileSource')?.value;
  
    if (fileSourceValue !== null && fileSourceValue !== undefined) {
        formData.append('file0', fileSourceValue);
    }
    const headers = new HttpHeaders({
      'Authorization': '' + this.userService.getToken(), 
      'Custom-Header': 'Valor personalizado', 
    });


       
    this.http.post( this.userService.base_url +'api/user/upload', formData, {headers} )
      .subscribe( (res: any) => {
        if(res.status =='success' ){

          //this.uploadData = {name_image : res.image,status_change: true}
          //this.uploadResult.emit(this.uploadData);
          //this.nameImageChange.emit(res.image);
        }
        alert('Acttualizo avatar');
      })
  }

}
