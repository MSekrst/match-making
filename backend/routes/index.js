import express from 'express';
import {resolve} from 'path';

import matchRouter from './match';
import facebookRouter from './facebook';
import companiesRouter from './companies';
import tableRouter from './tables'

const router = express.Router();

// match router - POST /match
router.use('/match', matchRouter);

// facebook login router
router.use('/facebook', facebookRouter);

// companies router - GET /companies
router.use('/companies', companiesRouter);

// table router - GET /matches /companies
router.use('/tables', tableRouter);

router.use('/*', function(req, res) {
  res.sendFile(resolve(__dirname, '../../build/index.html'))
});

export default router;
