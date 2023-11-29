import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, ReactiveFormsModule , /*file*/ FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { CategoryService } from '../../services/category/category.service';
import { Post } from '../../models/post';
import {FileUploadComponent } from '../utils/file-upload/file-upload.component';


import {  } from '@angular/forms';
//import { AngularFileUploaderModule } from "angular-file-uploader";

//import { HttpClientModule} from '@angular/common/http';
//import { AngularEditorModule } from '@kolkov/angular-editor';
//import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-post-new',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadComponent 
  //  AngularFileUploaderModule
  //  HttpClientModule, 
  //  AngularEditorModule


  ],
  templateUrl: './post-new.component.html',
  styleUrl: './post-new.component.css',
  providers: [UserService, CategoryService]
})
export class PostNewComponent implements OnInit {

  public page_title: string;
  public status: string;
  public identity: any;
  public token: any;
  public post: any;
  public categories: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.page_title = 'Crear una nueva entrada';
    this.status = '';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  /** file upload */
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

 
  ngOnInit(): void {
    this.getCategories();
    this.post = new Post(1, this.identity.id, 1, '', '', '', '');
  }

  onSubmit(form: any) {

    console.log(this.post)
  }

  imageUpload(data : any){
    let image_data =  JSON.parse(data.response);
    this.post.image = image_data.image;
  }

  getCategories() {
    this._categoryService.getCategories().then(response => {
      if (response.status == 'success') {
        this.status = 'success';
        this.categories = response.categories;
      } else {
        this.status = 'error';
      }
    }).catch(error => {
      this.status = 'error';
    });
  }


  /** upload file *** */
  get f(){
    return this.myForm.controls;
  }

  onFileChange(event:any) {
    alert('fileChange 1')
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  } 
  submitFile(){
    
  }

  /************* */

}
