import express from 'express';

import getDb from '../helpers/mongo';

const matchRouter = express.Router();

matchRouter.post('/', (req, res) => {
  const db = getDb();

  db.collection('matches').insertOne(req.body, (err, match) => {
    if (err) {
      res.status(503).json({ message: "Data insert failed" });

      return;
    }

    res.status(201).send({ ...req.body, _id: match.insertedId });
  });
});

export default matchRouter;
