import Pais from '../models/pais.js';

class PaisController {
  static async getAllPaises(req, res) {
    try {
      const paises = await Pais.readAll(); 
      res.status(200).json(paises);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al obtener países', error });
    }
  }

  static async createPais(req, res) {
    try {
      const data = req.body;
      const result = await Pais.create(data);
      res.status(201).json({ message: 'País creado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear país', error });
    }
  }

  static async updatePais(req, res) {
    try {
      const data = req.body;
      const result = await Pais.update(data);
      res.status(200).json({ message: 'País actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar país', error });
    }
  }

  static async deletePais(req, res) {
    const { id_pais } = req.body;
    try {
      const result = await Pais.delete(id_pais);
      res.status(200).json({ message: 'País eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar país', error });
    }
  }
}

export default PaisController;
