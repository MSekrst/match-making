import express from 'express';

import getDb from '../helpers/mongo';

const tableRouter = express.Router();

tableRouter.get('/matches', (req, res) => {
  const db = getDb();

  db.collection('matches').find({}, { sort: [['score','desc']], limit: 10 }).toArray((err, matches) => {
    if (err) {
      res.status(503).send({ message: "Error while getting matches" });

      return;
    }

    for (let i = 0; i < matches.length; ++i) {
      matches[i]['index'] = i + 1;
    }

    res.status(200).send(matches);
  });
});

export default tableRouter;
