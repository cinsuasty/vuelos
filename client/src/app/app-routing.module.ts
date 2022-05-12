import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { ListarAerolineaComponent } from './components/listar-aerolinea/listar-aerolinea.component';
import { CrearAerolineaComponent } from './components/crear-aerolinea/crear-aerolinea.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'listar-usuario', component: ListarUsuariosComponent },
  { path: 'crear-usuario', component: CrearUsuarioComponent },
  { path: 'editar-usuario/:id', component: CrearUsuarioComponent },

  { path: 'listar-aerolineas', component: ListarAerolineaComponent },
  { path: 'crear-aerolinea', component: CrearAerolineaComponent },
  { path: 'editar-aerolinea/:id', component: CrearAerolineaComponent },


  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
