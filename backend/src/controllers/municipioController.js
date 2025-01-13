import Municipio from '../models/municipio.js';

class MunicipioController {
  static async getAllMunicipios(req, res) {
    try {
      const municipios = await Municipio.readAll();
      res.status(200).json(municipios);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener municipios', error });
    }
  }
 

  static async getMunicipiosByDepartamento  (req, res)  {
    try {
      const { id } = req.params; 
      const municipios = await Municipio.getByDepartamento(id);
      res.status(200).json(municipios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los municipios por departamento.' });
    }
  };


  static async createMunicipio(req, res) {
    try {
      const data = req.body;
      const result = await Municipio.create(data);
      res.status(201).json({ message: 'Municipio creado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear municipio', error });
    }
  }

  static async updateMunicipio(req, res) {
    try {
      const data = req.body;
      const result = await Municipio.update(data);
      res.status(200).json({ message: 'Municipio actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar municipio', error });
    }
  }

  static async deleteMunicipio(req, res) {
    try {
      const { id_municipio } = req.body;
      const result = await Municipio.delete(id_municipio);
      res.status(200).json({ message: 'Municipio eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar municipio', error });
    }
  }
}

export default MunicipioController;
