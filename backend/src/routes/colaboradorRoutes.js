import express from 'express';
import colaboradorController from '../controllers/colaboradorController.js';

const router = express.Router();

router.get('/', colaboradorController.getColaboradores);
router.post('/', colaboradorController.createColaborador);
router.put('/', colaboradorController.updateColaborador);
router.delete('/', colaboradorController.deleteColaborador);

export default router;