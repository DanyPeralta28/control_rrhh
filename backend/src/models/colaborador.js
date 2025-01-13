import pool from '../config/database.js';

class Colaborador {
  static async readAll() {
    const query = `SELECT c.*, e.nombre_comercial AS empresa
                  FROM  colaboradores c
                  JOIN empresas e ON c.id_empresa = e.id_empresa
                  WHERE c.situacion_colaborador = 1`;
    const [rows] = await pool.query(query);
    return rows;
  }

  static async create({ nombre, edad, telefono, correo, id_empresa }) {
    const query = `
      INSERT INTO colaboradores (nombre, edad, telefono, correo, id_empresa, situacion_colaborador)
      VALUES (?, ?, ?, ?, ?, 1)
    `;
    const [result] = await pool.query(query, [nombre, edad, telefono, correo, id_empresa]);
    return result;
  }

  static async update({ id_colaborador, nombre, edad, telefono, correo, id_empresa }) {
    const query = `
      UPDATE colaboradores
      SET nombre = ?, edad = ?, telefono = ?, correo = ?, id_empresa = ?
      WHERE id_colaborador = ?
    `;
    const [result] = await pool.query(query, [nombre, edad, telefono, correo, id_empresa, id_colaborador]);
    return result;
  }

  static async delete(id_colaborador) {
    const query = `
      UPDATE colaboradores
      SET situacion_colaborador = 0
      WHERE id_colaborador = ?
    `;
    const [result] = await pool.query(query, [id_colaborador]);
    return result;
  }
}

export default Colaborador;
