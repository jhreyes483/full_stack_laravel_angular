import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { FileUploadComponent } from './components/utils/file-upload/file-upload.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout/:sure',
        component: LoginComponent
    },
    {
        path: 'registro',
        component: RegisterComponent
    },
    {
        path: 'inicio',
        component: HomeComponent
    },

    {
        path: 'ajustes',
        component: UserEditComponent
    },
    {
        path: 'file',
        component:FileUploadComponent
    },
    {
        path: 'crear-entrada',
        component: PostNewComponent
    },
    {
    path: 'crear-categoria',
    component: CategoryNewComponent
    },

    {
        // debe ser la final
        path: '**',
        component: ErrorComponent
    }
    
  ]