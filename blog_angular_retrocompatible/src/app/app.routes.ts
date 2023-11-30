import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { FileUploadComponent } from './components/utils/file-upload/file-upload.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';

import { IdentityGuard } from './services/ideinty.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [IdentityGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
       // canActivate: [IdentityGuard]
    },
    {
        path: 'logout/:sure',
        component: LoginComponent,
        canActivate: [IdentityGuard]
    },
    {
        path: 'registro',
        component: RegisterComponent,
        canActivate: [IdentityGuard]
    },
    {
        path: 'inicio',
        component: HomeComponent,
        //canActivate: [IdentityGuard]
    },

    {
        path: 'ajustes',
        component: UserEditComponent,
        canActivate: [IdentityGuard]
    },
    {
        path: 'file',
        component:FileUploadComponent,
        canActivate: [IdentityGuard]
    },
    {
        path: 'crear-entrada',
        component: PostNewComponent,
        canActivate: [IdentityGuard]
    },
    {
        path: 'crear-categoria',
        component: CategoryNewComponent,
        canActivate: [IdentityGuard]
    },
    {
        //<!-- le pasa el por get a la url para el detail -->
        path: 'entrada/:id',
        component: PostDetailComponent,
      //  canActivate: [IdentityGuard]
    },
    {
        path: 'editar-entrada/:id',
        component: PostEditComponent,
        canActivate: [IdentityGuard]
    },    
    {
        path: 'categoria/:id',
        component: CategoryDetailComponent,
        canActivate: [IdentityGuard]
    },

    {
        // debe ser la final
        path: '**',
        component: ErrorComponent,
    }
    
  ]