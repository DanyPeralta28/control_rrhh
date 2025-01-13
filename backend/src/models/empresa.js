import pool from '../config/database.js';

class Empresa {
  static async readAll() {
    const query = `
      SELECT e.*, d.nombre AS departamento, m.nombre AS municipio
      FROM empresas e
      JOIN departamentos d ON e.id_departamento = d.id_departamento
      JOIN municipios m ON e.id_municipio = m.id_municipio
      WHERE e.situacion_empresa = 1
    `;
    const [rows] = await pool.query(query);
    return rows;
  }

  static async create({ nit, razon_social, nombre_comercial, telefono, correo, id_departamento, id_municipio }) {
    const query = `
      INSERT INTO empresas (nit, razon_social, nombre_comercial, telefono, correo, id_departamento, id_municipio, situacion_empresa)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1)
    `;
    const [result] = await pool.query(query, [nit, razon_social, nombre_comercial, telefono, correo, id_departamento, id_municipio]);
    return result;
  }

  static async update({ id_empresa, nit, razon_social, nombre_comercial, telefono, correo, id_departamento, id_municipio }) {
    const query = `
      UPDATE empresas
      SET nit = ?, razon_social = ?, nombre_comercial = ?, telefono = ?, correo = ?, id_departamento = ?, id_municipio = ?
      WHERE id_empresa = ?
    `;
    const [result] = await pool.query(query, [nit, razon_social, nombre_comercial, telefono, correo, id_departamento, id_municipio, id_empresa]);
    return result;
  }

  static async delete(id_empresa) {
    const query = `
      UPDATE empresas
      SET situacion_empresa = 0
      WHERE id_empresa = ?
    `;
    const [result] = await pool.query(query, [id_empresa]);
    return result;
  }
}

export default Empresa;
