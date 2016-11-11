import express from 'express';

import getDb from '../helpers/mongo';

const matchRouter = express.Router();

matchRouter.post('/', (req, res) => {
  const db = getDb();

  const username = req.body.username || '';
  const companyName = req.body.companyName || '';

  const match = {
    username,
    companyName,
    score: calculateName(username, companyName)
  };

  db.collection('matches').findOneAndUpdate({
    username,
    companyName
  }, match, { upsert: true, returnOriginal: false }, (err, match) => {
    if (err) {
      res.status(503).json({ message: "Data insert failed" });
      return;
    }
    res.status(200).send(match.value);
  });
});

function calculateName(username, companyName) {
  const name = (username.toLowerCase().replace(/\s+/, "") + companyName.toLowerCase().replace(/\s+/, "")).substr(0, 20);
  let matchString = "";
  let match = 0;

  for (let i = 0; i < name.length; i++) {
    if (matchString.indexOf(name[i]) == -1) {
      matchString += name[i];
      match += name.charCodeAt(i);
    }
  }

  match = match % 80 + 20;

  return match;
}

export default matchRouter;
