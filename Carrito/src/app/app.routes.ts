import { Routes } from '@angular/router';
import { CarroComponent } from './components/carro/carro.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';

export const routes: Routes = [
    {
        path : '',
        redirectTo : '/catalogo',
        pathMatch : 'full'
    },
    {
        path : 'carrito',
        component : CarroComponent
    },
    {
        path : 'catalogo',
        component : CatalogoComponent
    }

];
