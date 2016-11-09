import express from 'express';

import getDb from '../helpers/mongo';

const tableRouter = express.Router();

tableRouter.get('/matches', (req, res) => {
  const db = getDb();

  db.collection('matches').find({}, { limit: 15, sort: [['score','desc']] }).toArray((err, matches) => {
    if (err) {
      res.status(503).send({ message: "Error while getting matches" });

      return;
    }

    res.status(200).send(matches);
  });
});

export default tableRouter;
