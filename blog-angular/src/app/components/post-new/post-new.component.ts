import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { CategoryService } from '../../services/category/category.service'; 
import { Post } from '../../models/post';

//import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-post-new',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    //HttpClientModule, 
    AngularEditorModule
    

  ],
  templateUrl: './post-new.component.html',
  styleUrl: './post-new.component.css',
  providers: [UserService, CategoryService]
})
export class PostNewComponent implements OnInit {

  public page_title : string;
  public status     : string;
  public identity   : any;
  public token      : any;
  public post       : any;

  constructor(
    private _route           : ActivatedRoute,
    private _router          : Router,
    private _userService     : UserService,
    private _categoryService : CategoryService
  ){
    this.page_title  = 'Crear una nueva entrada';
    this.status      = '';
    this.identity    = this._userService.getIdentity();
    this.token       = this._userService.getToken(); 
  }
  /*
  public editorConfig: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };
*/
  public editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    
}
  

  ngOnInit(): void {
    this.post = new Post(1,this.identity.id,1,'','','','');
    //console.log('post',this.post) 
  }

  onSubmit(form : any){
    
    console.log(this.post)
  }

  /*
        public id: number,
        public user_id: number,
        public category_id: number,
        public title: string,
        public content: string,
        public image: string,
        public createdAt: any
  */
  
  
}
