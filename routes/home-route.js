import express from 'express';
import {GetByName, GetByRegion, GetHome, GetByType} from '../controllers/HomeController.js';

const router = express.Router();

//Home router
router.get('/', GetHome);
router.post('/filter-by-name', GetByName);
router.post('/filter-by-region', GetByRegion);
router.post('/filter-by-type', GetByType);

export default router;