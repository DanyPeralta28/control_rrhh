import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent implements OnInit {
  colaboradores: any[] = [];
  empresas: any[] = [];
  nuevoColaborador: any = {
    nombre: '',
    edad: null,
    telefono: '',
    correo: '',
    id_empresa: null
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getColaboradores();
    this.getEmpresas();
  }

  getColaboradores(): void {
    this.apiService.getAll('colaboradores').subscribe((data) => {
      this.colaboradores = data.map((colaborador: any) => ({
        ...colaborador,
        editando: false
      }));
    });
  }

  getEmpresas(): void {
    this.apiService.getAll('empresas').subscribe((data) => {
      this.empresas = data;
    });
  }

  agregarColaborador(): void {
    const { nombre, edad, telefono, correo, id_empresa } = this.nuevoColaborador;
    let camposFaltantes: string[] = [];
  
    if (!nombre.trim()) camposFaltantes.push('Nombre');
    if (!edad) camposFaltantes.push('Edad');
    if (!telefono.trim()) camposFaltantes.push('Teléfono');
    if (!correo.trim()) camposFaltantes.push('Correo');
    if (!id_empresa) camposFaltantes.push('Empresa');
  
    if (camposFaltantes.length > 0) {
      alert('Te hace falta llenar los siguientes campos: ' + camposFaltantes.join(', '));
      return; 
    }
  
    this.apiService.create('colaboradores', this.nuevoColaborador).subscribe(
      (response) => {
        alert('Colaborador creado con éxito');
        this.getColaboradores();
        this.nuevoColaborador = { nombre: '', edad: null, telefono: '', correo: '', id_empresa: null };
      },
      (error) => {
        alert('Error al crear el colaborador');
      }
    );
  }

  habilitarEdicion(colaborador: any): void {
    const confirmacion = confirm('¿Deseas habilitar la edición para este colaborador?');
    if (confirmacion) {
      colaborador.editando = true;
      alert('Puedes editar los datos del colaborador ahora.');
    }
  }
  
  editarColaborador(colaborador: any): void {
    const confirmacion = confirm('¿Deseas guardar los cambios realizados en este colaborador?');
    if (confirmacion) {
      const data = {
        id_colaborador: colaborador.id_colaborador,
        nombre: colaborador.nombre,
        edad: colaborador.edad,
        telefono: colaborador.telefono,
        correo: colaborador.correo,
        id_empresa: colaborador.id_empresa
      };
  
      this.apiService.update('colaboradores', data).subscribe(
        (response) => {
          alert('Los datos del colaborador se actualizaron correctamente.');
          colaborador.editando = false;
          this.getColaboradores();
        },
        (error) => {
          alert('Hubo un problema al actualizar el colaborador.');
        }
      );
    }
  }
  
  eliminarColaborador(id_colaborador: number): void {
    const confirmacion = confirm('¿Estás seguro? Esta acción no se puede deshacer.');
    if (confirmacion) {
      const data = { id_colaborador: id_colaborador };
      this.apiService.delete('colaboradores', data).subscribe(
        (response) => {
          alert('El colaborador ha sido eliminado con éxito');
          this.getColaboradores();
        },
        (error) => {
          alert('No se pudo eliminar el colaborador');
        }
      );
    }
  }

  getEmpresaNombre(id_empresa: number): string {
    const empresa = this.empresas.find((e) => e.id_empresa === id_empresa);
    return empresa ? empresa.nombre_comercial : 'Desconocida';
  }
}
