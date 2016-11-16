import express from 'express';

import getDb from '../mongo/mongo';

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

tableRouter.get('/companies', (req, res) => {
  const db = getDb();

  db.collection('companies').find({}, { sort: [['matches','desc']], limit: 7 }).toArray((err, companies) => {
    if (err) {
      res.status(503).send({ message: "Error while getting companies" });

      return;
    }

    for (let i = 0; i < companies.length; ++i) {
      companies[i]['index'] = i + 1;
    }

    res.status(200).send(companies);
  });
});

export default tableRouter;
