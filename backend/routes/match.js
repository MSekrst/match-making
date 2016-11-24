import express from 'express';
import { ObjectId } from 'mongodb';

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

      if (!company[0]) {
        res.status(404).send('Company not found!');
      }

      res.status(200).send({ ...match.value, logoUrl: company[0].logoUrl });
    });

    db.collection('companies').updateOne({ companyName }, { $inc: { matches: 1 }});

    db.collection('companies').find({}, { sort: [['matches','desc']]}).limit(7).toArray((err, companies) => {
      if (err) {
        console.log('---ERROR--- while getting companies for socket');
      }

      for (let i = 0; i < companies.length; ++i) {
        companies[i]['index'] = i + 1;
      }

      io.emit('topCompanies', { companies });
    });

    const today = new Date().toISOString().substr(0, 10);

    db.collection('matches').find({_id: { $gt : ObjectId(Math.floor(new Date(today)/1000).toString(16) + "0000000000000000")}}, { sort: [['score','desc']]}).limit(10).toArray((err, matches) => {
      if (err) {
        console.log('---ERROR--- while getting matches for socket');
      }

      for (let i = 0; i < matches.length; ++i) {
        matches[i]['index'] = i + 1;
      }

      io.emit('topMatches', { matches });
    });

    io.emit('newMatch', match.value);
  });
});

const calculateName = (username, companyName) => {
  const name = (username.toLowerCase().replace(/\s+/, "").substr(0, 30) + companyName.toLowerCase().replace(/\s+/, ""));

  let score = 0;

  for (let i = 0; i < name.length; ++i) {
    let value = name.charCodeAt(i) || 1;

    if (name.charAt(i) === 'm') value = 2;
    if (name.charAt(i) === 'r') value = 3;
    if (name.charAt(i) === 'n') value = 4;
    if (name.charAt(i) === 'p') value = 5;
    if (name.charAt(i) === 't') value = 6;
    if (name.charAt(i) === 'l') value = 7;
    if (name.charAt(i) === 'j') value = 8;
    if (name.charAt(i) === 'ć') value = 9;

    score += value;
  }

  return score % 75 + 25;
};

export default matchRouter;
