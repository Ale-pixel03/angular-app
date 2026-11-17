import { Routes } from '@angular/router';
import { Productos } from './Pages/productos/productos';
import { Home } from './home/home';
import { Login } from './Pages/login/login';
import { Panel } from './Pages/panel/panel';

export const routes: Routes = [
    { path: '', component: Home, pathMatch: 'full' },
     {path: 'productos', component: Productos},
     {path: 'login', component:Login},
     {path: 'panel', component:Panel}
    
];
