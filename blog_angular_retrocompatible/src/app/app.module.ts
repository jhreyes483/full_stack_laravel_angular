import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';// formato de texto enriqusido
import { FileUploadComponent } from './components/utils/file-upload/file-upload.component';
import { PostNewComponent } from './components/post-new/post-new.component'; // componente personalisado para subir archivos



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    HomeComponent,
    UserEditComponent,
    CategoryNewComponent,
    PostNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forRoot(routes), 
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    FileUploadComponent,

   // AngularFileUploaderModule 

  ],
  providers: [FormsModule
    //FroalaEditorModule.forRoot(), FroalaViewModule.forRoot() 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
