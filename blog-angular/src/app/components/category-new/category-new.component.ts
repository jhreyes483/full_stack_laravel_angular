import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/category';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-category-new',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [UserService],
  templateUrl: './category-new.component.html',
  styleUrl: './category-new.component.css'
})
export class CategoryNewComponent {
  public page_title : string;
  public url        : string;
  public identity   : any;
  public token      : any;
  public category   : Category;
  public status     : any;
  public msg        : string;
  public isSubmit   : boolean;

  constructor(
    private _route         : ActivatedRoute,
    private _router        : Router,
    private _userService   : UserService,
    private _categoryServe : CategoryService


  ){
    this.page_title = "Crear categoria";
    this.url        = this._userService.base_url;
    this.identity   = this._userService.getIdentity();
    this.token      = this._userService.getToken();
    this.category   = new Category('','');
    this.isSubmit   = false;

    this.status     = 'error'; 
    this.msg        = 'nada';
  }

  onSubmit(form : any){
    this._categoryServe.store(this.category).then(response => {
        this.isSubmit   = true;
        if(response.status == 'success'){
          this.status     ='success';
          this.msg        = 'La categoria se ha creado correctamente !!';
          form.reset();
          this._router.navigate(['inicio'])

        }else{
          this.status = 'error';
          this.msg    = 'No se completo registro.';
        }
    }).catch(error => {
      this.status = 'error';
      this.msg    = 'No se completo registro..';
    });
  }
}
