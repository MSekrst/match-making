import express from 'express';

import getDb from '../mongo/mongo';
import password from '../../config/password';

const companiesRouter = express.Router();

companiesRouter.get('/', (req, res) => {
  const db = getDb();

  db.collection('companies').find({}, { sort: 'companyName' }).toArray((err, data) => {
    if (err) {
      res.status(503).send({ message: "Error while getting companies from database" });

      return;
    }

    res.status(200).send(data);
  });
});

companiesRouter.post('/', (req, res) => {
  if (!req.headers.token || req.headers.token !== password) {
    res.status(404).send({ message: 'Page not found' });
  } else {
    const db = getDb();

    const company = { ...req.body, matches: 0 };

    db.collection('companies').insertOne(company, err => {
      if (err) {
        console.log('---ERROR---while inserting company into a database');
      }

      res.status(200).send(company);
    });
  }
});

export default companiesRouter;
