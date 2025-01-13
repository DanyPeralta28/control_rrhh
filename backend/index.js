import express from 'express';
import cors from 'cors';
import paisRoutes from './src/routes/paisRoutes.js';
import departamentoRoutes from './src/routes/departamentoRoutes.js';
import municipioRoutes from './src/routes/municipioRoutes.js';
import empresaRoutes from './src/routes/empresaRoutes.js';
import colaboradorRoutes from './src/routes/colaboradorRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/paises', paisRoutes);
app.use('/api/departamentos', departamentoRoutes);
app.use('/api/municipios', municipioRoutes);
app.use('/api/empresas', empresaRoutes);
app.use('/api/colaboradores', colaboradorRoutes);

// Manejo de errores básicos
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
