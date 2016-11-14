import express from 'express';

import getDb from '../mongo/mongo';
import { io } from '../www';

const matchRouter = express.Router();

matchRouter.post('/', (req, res) => {
  const db = getDb();

  const username = req.body.username || '';
  const companyName = req.body.companyName || '';

  if (!username || !companyName) {
    return;
  }

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

    db.collection('companies').find({ companyName }).toArray((err, company) => {
      if (err) {
        res.status(200).send({ ...match.value, message: 'Company lookup failed!' });
        return;
      }

      res.status(200).send({ ...match.value, logoUrl: company[0].logoUrl });
    });

    db.collection('companies').updateOne({ companyName }, { $inc: { matches: 1 }});

    db.collection('companies').find({}, { sort: [['matches','desc']], limit: 10 }).toArray((err, companies) => {
      if (err) {
        console.log('---ERROR--- while getting companies for socket');
      }

      for (let i = 0; i < companies.length; ++i) {
        companies[i]['index'] = i + 1;
      }

      io.emit('topCompanies', { companies });
    });

    db.collection('matches').find({}, { sort: [['score','desc']], limit: 10 }).toArray((err, matches) => {
      if (err) {
        console.log('---ERROR--- while getting matches for socket');
      }

      for (let i = 0; i < matches.length; ++i) {
        matches[i]['index'] = i + 1;
      }

      io.emit('topMatches', { matches });
    });
  });
});

const calculateName = (username, companyName) => {
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
};

export default matchRouter;
