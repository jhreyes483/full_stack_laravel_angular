import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

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
        path: 'inicio',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registro',
        component: RegisterComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },


    {
        // deve ser la final
        path: '**',
        component: ErrorComponent
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
// EXPORTAR CONFIGURACION
export class AppRoutingModule {}
