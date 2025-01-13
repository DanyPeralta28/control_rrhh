import { Router } from 'express';
import {
  getDepartamentos,
  getDepartamentosByPais,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
} from '../controllers/departamentoController.js';

const router = Router();

router.get('/:id', getDepartamentosByPais);
router.get('/', getDepartamentos);
router.post('/', createDepartamento);
router.put('/', updateDepartamento);
router.delete('/', deleteDepartamento);

export default router;
