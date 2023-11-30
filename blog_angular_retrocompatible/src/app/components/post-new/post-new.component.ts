import { Component , OnInit} from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from '../../services/category/category.service';
import { Post } from '../../models/post';
import { Category } from '../../models/category';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrl: './post-new.component.css',
  
})
export class PostNewComponent implements OnInit {
  public page_title: string;
  public status: string;
  public identity: any;
  public token: any;
  public post: any;
  public categories: any;
  public isSubmit: boolean;
  public msg :string;
  public froala_options: Object;

  /******************************* */
  /* varibles de componente hijo upload file */
  public url_anex      : string = 'api/post/upload'; /** varibles de componente upload imagen */
  public id_anex       : string = '0'; /** varibles de componente upload imagen */
  public isSubmitImage : boolean ;
  public msg_class     : string;
  /******************************* */

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ){

    this.page_title = 'Crear una nueva entrada';
    this.status = '';
    this.msg = '';
    this.isSubmit = false;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.isSubmitImage = false;
    this.msg_class = '';
    this.froala_options = {
      /** configuracion de formulario texto enrriquesido */
      charCounterCount: true,
      toolbarButtons:   ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
      toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
      toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
      placeholderText: 'Contenido de el post',
      autofocus: false,
      disableRightClick: false
    };

  }

  

  ngOnInit(): void {
    this.getCategories();
    this.post = new Post(1, this.identity.id, 1, '', '', '', '');
  }

  onSubmit(form : any){
  
    if(this.isSubmitImage){
      this.isSubmit  = true;
      this.msg_class = 'success';
      this.createPost();
    }else{
      this.isSubmit  = true;
      this.msg_class = 'danger';
      this.msg       = 'Debe guardar la imagen primero'; 
    }
    console.log('post', this.post)
    
  }

  resposeFromFile(e : any){
    if(e.status == 'success'){
      this.post.image    = e.fileName
      this.isSubmitImage = true;
      this.isSubmit      = true;
      //alert('se ha guradado la imagen, ya pude crear el post')
     // this.createPost();
    }
  }

  createPost(){
    this._postService.store( this.post ).then(response => {
      if(response.status == 'success'){
        this._router.navigate(['/inicio']);
        this.status = 'success';
      }else{
        this.status = 'error';
        this.msg    = 'No se ha completado el guardado del post'; 
      }
  }).catch(error => {
    this.status = 'error';
  });
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
}


