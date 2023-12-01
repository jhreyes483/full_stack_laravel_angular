import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from '../../services/category/category.service';
import { Post } from '../../models/post';
import { Category } from '../../models/category';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',

  providers: [PostService, CategoryService, UserService]

})
export class PostEditComponent implements OnInit {
  public page_title: string;
  public status: string;
  public identity: any;
  public token: any;
  public post: any;
  public categories: any;
  public isSubmit: boolean;
  public msg: string;
  public froala_options: Object;

  /******************************* */
  /* varibles de componente hijo upload file */
  public url_anex: string = 'api/post/upload'; /** varibles de componente upload imagen */
  public id_anex: string = '0'; /** varibles de componente upload imagen */
  public isSubmitImage: boolean;
  public msg_class: string;
  public url : string;
  /******************************* */

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService,
  ) {

    this.page_title = 'Editar entrada';
    this.status = '';
    this.msg = '';
    this.isSubmit = false;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = this._userService.base_url;
    this.isSubmitImage = false;
    this.msg_class = '';
    this.froala_options = {
      /** configuracion de formulario texto enrriquesido */
      charCounterCount: true,
      lenguaje: 'es',
      toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
      toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
      toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
      placeholderText: 'Contenido de el post',
      autofocus: false,
      disableRightClick: false
    };

  }

  ngOnInit(): void {
    this.getCategories();
    this.post = new Post(1, this.identity.id, 1, '', '', '', '');
    this.getPost();
  }

  onSubmit(form: any) {
        this._postService.update(this.post, this.post.id).then(response => {
      response = response.data;
      if (response.status == 'success') {
        this.isSubmit = true;
        this.msg      = 'Actulizo el post';
        this.status   = 'success';
        this.msg_class = 'success';

          console.log('actualizo');
      } else {
        this.isSubmit = true;
        this.msg      = 'Error al actualizar';
        this.status   = 'error';
        this.msg_class = 'danger';
        console.log('error al actualizar');
      }
    }).catch(error => {
      console.log(error);
    });
   
  }

  resposeFromFile(e: any) {
    if (e.status == 'success') {
            this.post.image = e.fileName
            this.isSubmitImage = true;
      this.isSubmit = true;
      //alert('se ha guradado la imagen, ya pude crear el post')
      // this.createPost();
    }
  }

  getPost() {
    // sacar el id por get "de la url"
    this._route.params.subscribe(params => {
      let id = +params['id'];

      // peticion para sacar los datos de post
      this._postService.getPost(id).then(response => {
        if (response.status == 'success') {
          this.post = response.post;

          if(this.post.user_id != this.identity.id){
            this._router.navigate(['inicio']);
          }
        } else {

          this._router.navigate(['inicio']);

        }
      }).catch(error => {
        console.log(error);

        this._router.navigate(['inicio']);

      });
    })
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


