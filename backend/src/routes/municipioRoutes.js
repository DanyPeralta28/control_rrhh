import express from 'express';
import MunicipioController from '../controllers/MunicipioController.js';

const router = express.Router();

router.get('/', MunicipioController.getAllMunicipios);
router.get('/:id', MunicipioController.getMunicipiosByDepartamento);
router.post('/', MunicipioController.createMunicipio);
router.put('/', MunicipioController.updateMunicipio);
router.delete('/', MunicipioController.deleteMunicipio);

export default router;
