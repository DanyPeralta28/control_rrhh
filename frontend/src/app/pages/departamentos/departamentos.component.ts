import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  departamentos: any[] = [];
  paises: any[] = [];
  nuevoDepartamento: string = '';
  paisSeleccionado: string | null = '';
  isSubmitted = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getDepartamentos();
    this.getPaises();
  }

  getDepartamentos(): void {
    this.apiService.getAll('departamentos').subscribe((data) => {
      this.departamentos = data.map((departamento: any) => ({
        ...departamento,
        editando: false
      }));
    });
  }

  getPaises(): void {
    this.apiService.getAll('paises').subscribe((data) => {
      this.paises = data;
    });
  }

  agregarDepartamento(): void {
    if (!this.paisSeleccionado || !this.nuevoDepartamento.trim()) {
      alert('Error: Debes seleccionar un país y escribir el nombre del departamento.');
      return;
    }

    const data = { nombre: this.nuevoDepartamento, id_pais: this.paisSeleccionado };
    this.apiService.create('departamentos', data).subscribe(
      (response) => {
        alert('Éxito: Departamento creado con éxito'); 

        this.getDepartamentos();

        this.nuevoDepartamento = ''; 
        this.paisSeleccionado = ''; 
      },
      (error) => {
        alert('Error: Error al crear el departamento');
      }
    );
  }

  habilitarEdicion(departamento: any): void {
    departamento.editando = true;
  }

  editarDepartamento(departamento: any): void {
    const data = {
      id_departamento: departamento.id_departamento,
      nombre: departamento.nombre,
      id_pais: departamento.id_pais
    };
    this.apiService.update('departamentos', data).subscribe(
      (response) => {
        alert('Éxito: Departamento actualizado con éxito'); 
        departamento.editando = false;
        this.getDepartamentos();
      },
      (error) => {
        alert('Error: Error al actualizar el departamento');
      }
    );
  }

  eliminarDepartamento(id: number): void {
    const confirmDelete = confirm('¿Estás seguro? Una vez eliminado, no podrás recuperar este departamento.');
    if (confirmDelete) {
      const data = { id_departamento: id };
      this.apiService.delete('departamentos', data).subscribe(
        (response) => {
          alert('Eliminado: Departamento eliminado con éxito');
          this.getDepartamentos();
        },
        (error) => {
          alert('Error: Error al eliminar el departamento');
        }
      );
    }
  }

  getPaisNombre(id_pais: number): string {
    const pais = this.paises.find((p) => p.id_pais === id_pais);
    return pais ? pais.nombre : 'Desconocido';
  }
}
