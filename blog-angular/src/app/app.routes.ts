import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//IMPORSTAR COMPONENTES
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

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
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
// EXPORTAR CONFIGURACION
export class AppRoutingModule {}
