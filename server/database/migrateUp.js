import dotenv from 'dotenv';
import pool from './config';

dotenv.config();

(async () => {
  const users = `CREATE TABLE IF NOT EXISTS 
    users (
        id serial primary key,
        firstname VARCHAR,
        lastname VARCHAR,
        othername VARCHAR,
        email VARCHAR,
        password VARCHAR,
        phonenumber INT,
        passporturl VARCHAR,
        isadmin VARCHAR
    )`;
  const parties = `CREATE TABLE IF NOT EXISTS 
    parties (
        id serial primary key,
        name VARCHAR UNIQUE,
        hqaddress VARCHAR,
        logourl VARCHAR
        )`;
  const offices = `CREATE TABLE IF NOT EXISTS 
    offices (
        id serial primary key,
        type VARCHAR,
        name VARCHAR UNIQUE
        )`;
  const candidates = `CREATE TABLE IF NOT EXISTS 
    candidates (
        id SERIAL,
        office INT,
        party INT,
        candidate INT,
        PRIMARY KEY(candidate, office)
        )`;
  const votes = `CREATE TABLE IF NOT EXISTS 
    votes (
        id SERIAL,
        createdon TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        createdby INT,
        office INT,
        candidate INT,
        PRIMARY KEY (createdby, office)
        )`;
  const petitions = `CREATE TABLE IF NOT EXISTS 
    petitions (
        id serial primary key,
        createdon TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        createdby INT,
        office INT,
        body VARCHAR
        )`;

  const promises = [users, parties, offices, candidates, votes, petitions].map(async query => {
    await pool.query(query);
  });
  await Promise.all(promises);
})();
