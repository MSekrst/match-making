import express from 'express';

import dbConnection from '../mongo';

const matchRouter = express.Router();

// pattern showcase
matchRouter.get('/', (req, res, next) => {
  const db = dbConnection();
  db.collection('collenction-name').insertOne({
    key: 'value'
  });

  res.send('Server match working!');
});

export default matchRouter;
