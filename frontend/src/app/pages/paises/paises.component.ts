import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {
  paises: any[] = [];
  nuevoPais: string = '';
  botonHabilitado: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getPaises();
  }

  getPaises(): void {
    this.apiService.getAll('paises').subscribe((data) => {
      this.paises = data.map((pais: any) => ({ ...pais, editando: false }));
    });
  }

  validarBoton(): void {
    this.botonHabilitado = this.nuevoPais.trim().length > 0;
  }

  agregarPais(): void {
    const data = { nombre: this.nuevoPais };
    this.apiService.create('paises', data).subscribe(
      (response) => {
        alert('Éxito: País creado con éxito'); 
        this.getPaises();
        this.nuevoPais = '';
      },
      (error) => {
        alert('Error: Error al crear el país');
      }
    );
  }

  habilitarEdicion(pais: any): void {
    pais.editando = true;
  }

  editarPais(pais: any): void {
    const data = { id_pais: pais.id_pais, nombre: pais.nombre };
    this.apiService.update('paises', data).subscribe(
      (response) => {
        alert('Éxito: País actualizado con éxito');
        pais.editando = false;
        this.getPaises();
      },
      (error) => {
        alert('Error: Error al actualizar el país');
      }
    );
  }

  eliminarPais(id: number): void {
    const confirmDelete = confirm('¿Estás seguro? Una vez eliminado, no podrás recuperar este país.');
    if (confirmDelete) {
      const data = { id_pais: id };
      this.apiService.delete('paises', data).subscribe(
        (response) => {
          alert('Eliminado: País eliminado con éxito'); 
          this.getPaises();
        },
        (error) => {
          alert('Error: Error al eliminar el país'); 
        }
      );
    }
  }
}
