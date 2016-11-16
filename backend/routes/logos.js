import express from 'express';
import { resolve } from 'path';

const logosRouter = express.Router();

logosRouter.get('/:id', (req, res) => {
  res.status(200).sendFile(resolve(__dirname, '../../images/companies/' + req.params.id));
});

export default logosRouter;
