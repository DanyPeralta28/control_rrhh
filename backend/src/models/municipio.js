import pool from '../config/database.js';

class Municipio {
  static async readAll() {
    const query = `
      SELECT m.*, d.nombre AS departamento
      FROM municipios m
      JOIN departamentos d ON m.id_departamento = d.id_departamento
      WHERE m.situacion_municipio = 1;
    `;
    const [rows] = await pool.query(query);
    return rows;
  }

  static async getByDepartamento(id_departamento) {
    const query = `
      SELECT id_municipio, nombre 
      FROM municipios
      WHERE id_departamento = ? AND situacion_municipio = 1;
    `;
    const [rows] = await pool.query(query, [id_departamento]);
    return rows;
  }  

  static async create(data) {
    const query = `
      INSERT INTO municipios (nombre, id_departamento, situacion_municipio)
      VALUES (?, ?, 1);
    `;
    const [result] = await pool.query(query, [data.nombre, data.id_departamento]);
    return result;
  }

  static async update(data) {
    const query = `
      UPDATE municipios 
      SET nombre = ?, id_departamento = ? 
      WHERE id_municipio = ?;
    `;
    const [result] = await pool.query(query, [data.nombre, data.id_departamento, data.id_municipio]);
    return result;
  }

  static async delete(id_municipio) {
    const query = `
      UPDATE municipios 
      SET situacion_municipio = 0 
      WHERE id_municipio = ?;
    `;
    const [result] = await pool.query(query, [id_municipio]);
    return result;
  }
}

export default Municipio;
