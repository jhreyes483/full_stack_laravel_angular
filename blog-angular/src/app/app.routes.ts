import { Routes } from '@angular/router';



//IMPORSTAR COMPONENTES
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';

// DEFINIR RUTAS
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
        // debe ser la final
        path: '**',
        component: ErrorComponent
    }
];
