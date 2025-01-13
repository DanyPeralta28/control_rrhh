import express from 'express';
import PaisController from '../controllers/paisController.js';

const router = express.Router();

router.get('/', PaisController.getAllPaises);
router.post('/', PaisController.createPais);
router.put('/', PaisController.updatePais);
router.delete('/', PaisController.deletePais);

export default router;
