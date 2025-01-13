import pool from '../config/database.js';

class Departamento {
  async readAll() {
    const query = `SELECT d.*, p.nombre AS pais 
                   FROM departamentos d 
                   JOIN paises p ON d.id_pais = p.id_pais
                   WHERE d.situacion_departamento = 1`;
    const [rows] = await pool.query(query);
    return rows;
  }

  async getByPais(id_pais) {
    const query = `SELECT id_departamento, nombre FROM departamentos
                  WHERE id_pais = ? AND situacion_departamento = 1`;
    const [rows] = await pool.query(query,[id_pais]);
    return rows;
  }

  async create(nombre, id_pais) {
    const query = `INSERT INTO departamentos (nombre, id_pais, situacion_departamento) 
                   VALUES (?, ?, 1)`;
    const [result] = await pool.query(query, [nombre, id_pais]);
    return result;
  }

  async update(id_departamento, nombre, id_pais) {
    const query = `UPDATE departamentos 
                   SET nombre = ?, id_pais = ? 
                   WHERE id_departamento = ?`;
    const [result] = await pool.query(query, [nombre, id_pais, id_departamento]);
    return result;
  }

  async delete(id_departamento) {
    const query = `UPDATE departamentos 
                   SET situacion_departamento = 0 
                   WHERE id_departamento = ?`;
    const [result] = await pool.query(query, [id_departamento]);
    return result;
  }
}

export default Departamento;
