import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  editando = false;
  empresaIdEdicion: number | null = null; 
  empresas: any[] = [];
  paises: any[] = [];
  departamentos: any[] = [];
  municipios: any[] = [];
  departamentosTotales: any[] = [];
  municipiosTotales: any[] = [];
  nuevoNit = '';
  nuevaRazonSocial = '';
  nuevoNombreComercial = '';
  nuevoTelefono = '';
  nuevoCorreo = '';
  paisSeleccionado: number | null = null;
  departamentoSeleccionado: number | null = null;
  municipioSeleccionado: number | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getEmpresas();
    this.getPaises();
    this.getTodosLosDepartamentos();
    this.getTodosLosMunicipios();
  }

  getEmpresas(): void {
    this.apiService.getAll('empresas').subscribe((data) => {
      this.empresas = data.map((empresa: any) => ({
        ...empresa,
        nombre_departamento: this.getDepartamentoNombre(empresa.id_departamento),
        nombre_municipio: this.getMunicipioNombre(empresa.id_municipio)
      }));
    });
  }

  getPaises(): void {
    this.apiService.getAll('paises').subscribe(
      (data) => (this.paises = data),
      () => {
        alert('Hubo un problema al obtener la lista de países');
      }
    );
  }
  

  getTodosLosDepartamentos(): void {
    this.apiService.getAll('departamentos').subscribe(
      (data) => (this.departamentosTotales = data),
      () => {
        alert('Hubo un problema al obtener todos los departamentos');
      }
    );
  }
  

  getTodosLosMunicipios(): void {
    this.apiService.getAll('municipios').subscribe(
      (data) => (this.municipiosTotales = data),
      () => {
        alert('Hubo un problema al obtener todos los municipios');
      }
    );
  }
  

  getDepartamentos(): void {
    if (this.paisSeleccionado) {
      this.apiService.getAll(`departamentos/${this.paisSeleccionado}`).subscribe(
        (data) => (this.departamentos = data),
        () => {
          alert('Hubo un problema al obtener los departamentos');
        }
      );
    } else {
      this.departamentos = [];
    }
  }
  

  getMunicipios(): void {
    if (this.departamentoSeleccionado) {
      this.apiService.getAll(`municipios/${this.departamentoSeleccionado}`).subscribe(
        (data) => (this.municipios = data),
        () => {
          alert('Hubo un problema al obtener los municipios');
        }
      );
    } else {
      this.municipios = [];
    }
  }
  

  onPaisChange(): void {
    this.departamentoSeleccionado = null;
    this.municipioSeleccionado = null;
    this.getDepartamentos();
  }

  onDepartamentoChange(): void {
    this.municipioSeleccionado = null;
    this.getMunicipios();
  }

  agregarEmpresa(): void {
    const camposFaltantes: string[] = [];
  
    if (!this.nuevoNit.trim()) camposFaltantes.push('NIT');
    if (!this.nuevaRazonSocial.trim()) camposFaltantes.push('Razón Social');
    if (!this.nuevoNombreComercial.trim()) camposFaltantes.push('Nombre Comercial');
    if (!this.nuevoTelefono.trim()) camposFaltantes.push('Teléfono');
    if (!this.nuevoCorreo.trim()) camposFaltantes.push('Correo');
    if (this.departamentoSeleccionado === null) camposFaltantes.push('Departamento');
    if (this.municipioSeleccionado === null) camposFaltantes.push('Municipio');
  
    if (camposFaltantes.length > 0) {
      alert(`Por favor completa los siguientes campos antes de guardar: ${camposFaltantes.join(', ')}.`);
      return;
    }
  
    const data: {
      nit: string;
      razon_social: string;
      nombre_comercial: string;
      telefono: string;
      correo: string;
      id_departamento: number | null;
      id_municipio: number | null;
      id_empresa?: number; 
    } = {
      nit: this.nuevoNit.trim(),
      razon_social: this.nuevaRazonSocial.trim(),
      nombre_comercial: this.nuevoNombreComercial.trim(),
      telefono: this.nuevoTelefono.trim(),
      correo: this.nuevoCorreo.trim(),
      id_departamento: this.departamentoSeleccionado,
      id_municipio: this.municipioSeleccionado,
    };
  
    if (this.editando && this.empresaIdEdicion !== null) {
      data.id_empresa = this.empresaIdEdicion;
  
      this.apiService.update('empresas', data).subscribe(
        () => {
          alert('Empresa actualizada con éxito');
          this.resetForm();
          this.getEmpresas();
        },
        () => {
          alert('Error al actualizar la empresa');
        }
      );
    } else {
      this.apiService.create('empresas', data).subscribe(
        () => {
          alert('Empresa creada con éxito');
          this.resetForm();
          this.getEmpresas();
        },
        () => {
          alert('Error al crear la empresa');
        }
      );
    }
  }
  

  eliminarEmpresa(id: number): void {
    const confirmation = confirm('¿Estás seguro? Esta acción no se puede deshacer');
    if (confirmation) {
      const data = { id_empresa: id };
      this.apiService.delete('empresas', data).subscribe(
        () => {
          alert('La empresa ha sido eliminada con éxito');
          this.getEmpresas(); 
        },
        () => alert('Hubo un problema al eliminar la empresa')
      );
    }
  }

  camposFormularioValidos(): boolean {
    return (
      !!this.nuevoNit.trim() &&                
      !!this.nuevaRazonSocial.trim() &&         
      !!this.nuevoNombreComercial.trim() &&     
      !!this.nuevoTelefono.trim() &&            
      !!this.nuevoCorreo.trim() &&              
      this.paisSeleccionado !== null &&         
      this.departamentoSeleccionado !== null && 
      this.municipioSeleccionado !== null     
    );
  }
  

  resetForm(): void {
    this.editando = false;
    this.empresaIdEdicion = null;
    this.nuevoNit = '';
    this.nuevaRazonSocial = '';
    this.nuevoNombreComercial = '';
    this.nuevoTelefono = '';
    this.nuevoCorreo = '';
    this.paisSeleccionado = null;
    this.departamentoSeleccionado = null;
    this.municipioSeleccionado = null;
    this.departamentos = [];
    this.municipios = [];
  }
  

  getDepartamentoNombre(id_departamento: number): string {
    const departamento = this.departamentosTotales.find((d) => d.id_departamento === id_departamento);
    return departamento ? departamento.nombre : 'Desconocido';
  }

  getMunicipioNombre(id_municipio: number): string {
    const municipio = this.municipiosTotales.find((m) => m.id_municipio === id_municipio);
    return municipio ? municipio.nombre : 'Desconocido';
  }

  editarEmpresa(empresa: any): void {
    this.editando = true;
    this.empresaIdEdicion = empresa.id_empresa;
    this.nuevoNit = empresa.nit;
    this.nuevaRazonSocial = empresa.razon_social;
    this.nuevoNombreComercial = empresa.nombre_comercial;
    this.nuevoTelefono = empresa.telefono;
    this.nuevoCorreo = empresa.correo;
  
    this.getPaises();
    this.getTodosLosDepartamentos();
    this.getTodosLosMunicipios();
  
    this.paisSeleccionado = null;
    this.departamentoSeleccionado = null;
    this.municipioSeleccionado = null;
  }
}
