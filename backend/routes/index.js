import express from 'express';

import matchRouter from './match';
import facebookRouter from './facebook';

const router = express.Router();

// homepage
router.get('/', (req, res) => {
  res.send('Server working!');
});

router.use('/match', matchRouter);
router.use('/facebook', facebookRouter);

export default router;
