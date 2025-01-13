import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PaisesComponent } from './pages/paises/paises.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { MunicipiosComponent } from './pages/municipios/municipios.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ColaboradoresComponent } from './pages/colaboradores/colaboradores.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    PaisesComponent,
    DepartamentosComponent,
    MunicipiosComponent,
    EmpresasComponent,
    ColaboradoresComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
