import express from 'express';

import matchRouter from './match';
import { io } from '../app';

const router = express.Router();

// homepage
router.get('/', (req, res) => {
  res.send('Server working!');
});

router.use('/match', matchRouter);

export default router;
