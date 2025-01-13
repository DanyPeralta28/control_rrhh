import pool from '../config/database.js';

class Pais {
  static async readAll() {
    const query = 'SELECT * FROM paises WHERE situacion_pais = 1';
    const [results] = await pool.query(query);
    return results;
  }

  static async create({ nombre }) {
    const query = 'INSERT INTO paises (nombre, situacion_pais) VALUES (?, 1)';
    const [result] = await pool.query(query, [nombre]);
    return result;
  }

  static async update(data) {
    const query = 'UPDATE paises SET nombre= ? WHERE id_pais = ?';
    const [result] = await pool.query(query, [data.nombre, data.id_pais]);
    return result;
  }

  static async delete(id_pais) {
    const query = 'UPDATE paises SET situacion_pais = 0 WHERE id_pais = ?';
    const [result] = await pool.query(query, [id_pais]);
    return result;
  }
}

export default Pais;