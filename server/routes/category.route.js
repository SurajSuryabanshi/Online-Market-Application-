import express from 'express';
import categoryCtrl from '../controllers/category.controller.js';

const router = express.Router();

router.route('/categories')
  .get(categoryCtrl.list);

export default router;
