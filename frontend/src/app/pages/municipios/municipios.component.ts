import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.css']
})
export class MunicipiosComponent implements OnInit {
  municipios: any[] = [];
  departamentos: any[] = [];
  nuevoMunicipio: string = '';
  departamentoSeleccionado: string = ''; 
  isSubmitted: boolean = false; 

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getMunicipios();
    this.getDepartamentos();
  }

  getMunicipios(): void {
    this.apiService.getAll('municipios').subscribe((data) => {
      this.municipios = data.map((municipio: any) => ({
        ...municipio,
        editando: false
      }));
    });
  }

  getDepartamentos(): void {
    this.apiService.getAll('departamentos').subscribe((data) => {
      this.departamentos = data;
    });
  }

  agregarMunicipio(): void {
    this.isSubmitted = true; 
    if (!this.departamentoSeleccionado || !this.nuevoMunicipio.trim()) {
      alert('Error: Debes seleccionar un departamento y escribir el nombre del municipio.'); 
      return;
    }

    const data = { nombre: this.nuevoMunicipio, id_departamento: this.departamentoSeleccionado };
    this.apiService.create('municipios', data).subscribe(
      (response) => {
        alert('Éxito: Municipio creado con éxito'); 
        this.getMunicipios();
        this.nuevoMunicipio = '';
        this.departamentoSeleccionado = ''; 
        this.isSubmitted = false;
      },
      (error) => {
        alert('Error: Error al crear el municipio'); 
      }
    );
  }

  habilitarEdicion(municipio: any): void {
    municipio.editando = true;
  }

  editarMunicipio(municipio: any): void {
    const data = {
      id_municipio: municipio.id_municipio,
      nombre: municipio.nombre,
      id_departamento: municipio.id_departamento
    };
    this.apiService.update('municipios', data).subscribe(
      (response) => {
        alert('Éxito: Municipio actualizado con éxito'); 
        municipio.editando = false;
        this.getMunicipios();
      },
      (error) => {
        alert('Error: Error al actualizar el municipio');
      }
    );
  }

  eliminarMunicipio(id: number): void {
    const confirmDelete = confirm('¿Estás seguro? Una vez eliminado, no podrás recuperar este municipio.'); // Confirmación nativa
    if (confirmDelete) {
      const data = { id_municipio: id };
      this.apiService.delete('municipios', data).subscribe(
        (response) => {
          alert('Eliminado: Municipio eliminado con éxito'); 
          this.getMunicipios();
        },
        (error) => {
          alert('Error: Error al eliminar el municipio');
        }
      );
    }
  }

  getDepartamentoNombre(id_departamento: number): string {
    const departamento = this.departamentos.find((d) => d.id_departamento === id_departamento);
    return departamento ? departamento.nombre : 'Desconocido';
  }
}
