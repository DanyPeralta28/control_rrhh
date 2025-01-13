import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importa los componentes
import { PaisesComponent } from './pages/paises/paises.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { MunicipiosComponent } from './pages/municipios/municipios.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ColaboradoresComponent } from './pages/colaboradores/colaboradores.component';

// Define las rutas
const routes: Routes = [
  { path: 'paises', component: PaisesComponent },
  { path: 'departamentos', component: DepartamentosComponent },
  { path: 'municipios', component: MunicipiosComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: 'colaboradores', component: ColaboradoresComponent },
  { path: '', redirectTo: '/paises', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/paises' } // Ruta para páginas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
