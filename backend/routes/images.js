import express from 'express';
import { resolve } from 'path';

const imagesRouter = express.Router();

imagesRouter.get('/:id', (req, res) => {
  res.status(200).sendFile(resolve(__dirname, '../../images/' + req.params.id));
});

export default imagesRouter;
