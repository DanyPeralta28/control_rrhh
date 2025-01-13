import Departamento from '../models/departamento.js';

const departamentoModel = new Departamento();

export const getDepartamentos = async (req, res) => {
  try {
    const departamentos = await departamentoModel.readAll();
    res.json(departamentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los departamentos.' });
  }
};

export const  getDepartamentosByPais = async (req, res) => {
  try {
    const { id } = req.params; 
    const departamentos = await departamentoModel.getByPais(id);
    res.json(departamentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los departamentos por país.' });
  }
};


export const createDepartamento = async (req, res) => {
  const { nombre, id_pais } = req.body;
  try {
    const result = await departamentoModel.create(nombre, id_pais);
    res.json({ message: 'Departamento creado.', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el departamento.' });
  }
};

export const updateDepartamento = async (req, res) => {
  const { id_departamento, nombre, id_pais } = req.body;
  try {
    const result = await departamentoModel.update(id_departamento, nombre, id_pais);
    res.json({ message: 'Departamento actualizado.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el departamento.' });
  }
};

export const deleteDepartamento = async (req, res) => {
  const { id_departamento } = req.body;
  try {
    const result = await departamentoModel.delete(id_departamento);
    res.json({ message: 'Departamento eliminado.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el departamento.' });
  }
};
