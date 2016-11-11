import { MongoClient } from 'mongodb';

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/match-maker';

let dbConnection;

export function connectDb() {
  MongoClient.connect(url, (err, db) => {
    if (err) {
      console.log('Error while connecting to database!');
    }

    dbConnection = db;
  });
}

export default function getDatabaseConnection() {
  return dbConnection;
}
