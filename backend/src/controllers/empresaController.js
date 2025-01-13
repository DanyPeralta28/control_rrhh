import Empresa from '../models/empresa.js';

class EmpresaController {
  static async getEmpresas(req, res) {
    try {
      const empresas = await Empresa.readAll();
      res.json(empresas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las empresas.' });
    }
  };

  static async createEmpresa  (req, res)  {
    const { nit, razon_social, nombre_comercial, telefono, correo, id_departamento, id_municipio } = req.body;
    try {
      const result = await Empresa.create({ nit, razon_social, nombre_comercial, telefono, correo, id_departamento, id_municipio });
      res.json({ message: 'Empresa creada.', id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear la empresa.' });
    }
  };

  static async updateEmpresa  (req, res) {
    const { id_empresa, nit, razon_social, nombre_comercial, telefono, correo, id_departamento, id_municipio } = req.body;
    try {
      const result = await Empresa.update({ id_empresa, nit, razon_social, nombre_comercial, telefono, correo, id_departamento, id_municipio });
      res.json({ message: 'Empresa actualizada.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la empresa.' });
    }
  };

  static async deleteEmpresa  (req, res)  {
    const { id_empresa } = req.body;
    try {
      const result = await Empresa.delete(id_empresa);
      res.json({ message: 'Empresa eliminada.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar la empresa.' });
    }
  };
}

export default EmpresaController