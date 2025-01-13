import express from 'express';
import EmpresaController from '../controllers/empresaController.js';

const router = express.Router();

router.get('/', EmpresaController.getEmpresas);
router.post('/', EmpresaController.createEmpresa);
router.put('/', EmpresaController.updateEmpresa);
router.delete('/', EmpresaController.deleteEmpresa);

export default router;
