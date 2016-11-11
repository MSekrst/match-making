import express from 'express';

import getDb from '../mongo/mongo';

const companiesRouter = express.Router();

companiesRouter.get('/', (req, res) => {
  const db = getDb();

  db.collection('companies').find({}).toArray((err, data) => {
    if (err) {
      res.status(503).send({ message: "Error while getting companies from database" });

      return;
    }

    res.status(200).send(data);
  });
});

export default companiesRouter;
