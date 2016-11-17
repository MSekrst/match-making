import express from 'express';
import { resolve } from 'path';

import matchRouter from './match';
import companiesRouter from './companies';
import tableRouter from './tables'
import logosRouter from './logos';
import imagesRouter from './images';

const router = express.Router();

// match router - POST /match
router.use('/match', matchRouter);

// companies router - GET /companies
router.use('/companies', companiesRouter);

// table router - GET /matches /companies
router.use('/tables', tableRouter);

// logos router - GET logo
router.use('/logos', logosRouter);

// images router - GET image
router.use('/images', imagesRouter);

// wildcard route -> returns index.html for react-router
router.use('/*', (req, res) => {
  res.sendFile(resolve(__dirname, '../../build/index.html'))
});

export default router;
