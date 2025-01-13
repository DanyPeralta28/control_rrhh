import Colaborador from '../models/colaborador.js';

class colaboradorController {

  static async getColaboradores(req, res) {
    try {
      const colaboradores = await Colaborador.readAll();
      res.status(200).json(colaboradores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los colaboradores.' });
    }
  };

  static async createColaborador(req, res) {
    const { nombre, edad, telefono, correo, id_empresa} = req.body;
    try {
      const result = await Colaborador.create({ nombre,edad, telefono, correo, id_empresa });
      res.json({ message: 'Colaborador creado.', id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el colaborador.' });
    }
  };

  static async updateColaborador(req, res) {
    const { id_colaborador, nombre, edad, telefono, correo, id_empresa } = req.body;
    try {
      const result = await Colaborador.update({ id_colaborador, nombre, edad, telefono, correo, id_empresa});
      res.json({ message: 'Colaborador actualizado.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el colaborador.' });
    }
  };

  static async deleteColaborador(req, res) {
    const { id_colaborador } = req.body;
    try {
      const result = await Colaborador.delete(id_colaborador);
      res.json({ message: 'Colaborador eliminado.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar el colaborador.' });
    }
  };
}

export default colaboradorController