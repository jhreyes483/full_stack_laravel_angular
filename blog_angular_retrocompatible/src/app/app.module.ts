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
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component'; // componente personalisado para subir archivos
import { IdentityGuard } from './services/ideinty.guard';// guardian de rutas
import { UserService } from './services/user/user.service';
import { ProfileComponent } from './components/profile/profile.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { TestComponent } from './components/test/test.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    HomeComponent,
    UserEditComponent,
    CategoryNewComponent,
    PostNewComponent,
    PostDetailComponent,
    PostEditComponent,
    CategoryDetailComponent,
    ProfileComponent,
    PostListComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forRoot(routes), 
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    FileUploadComponent,
    HttpClientModule

   // AngularFileUploaderModule 

  ],
  providers: [ /** manera global */
    FormsModule,
    IdentityGuard,
    UserService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
