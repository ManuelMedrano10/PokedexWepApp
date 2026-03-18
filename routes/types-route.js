import express from 'express';
import { GetIndex, GetCreate, PostCreate, GetEdit, PostEdit, Delete } from '../controllers/TypesController.js';

const router = express.Router();

//Pokemon Types router
router.get('/index', GetIndex);
router.get('/create', GetCreate);
router.post('/create', PostCreate);
router.get('/edit/:typeId', GetEdit);
router.post('/edit', PostEdit);
router.post('/delete', Delete);

export default router;