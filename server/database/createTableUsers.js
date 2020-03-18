import dotenv from 'dotenv';
import pool from './configuration';

dotenv.config();

const createtableusers = async () => {
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
        isadmin VARCHAR DEFAULT 'false'
    )`;
  const parties = `CREATE TABLE IF NOT EXISTS 
    parties (
        id serial primary key,
        name VARCHAR,
        hqaddress VARCHAR,
        logourl VARCHAR
        )`;
  const offices = `CREATE TABLE IF NOT EXISTS 
    offices (
        id serial primary key,
        type VARCHAR,
        name VARCHAR
        )`;
  const candidates = `CREATE TABLE IF NOT EXISTS 
    candidates (
        id serial primary key,
        office INT,
        party INT,
        candidate INT
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

  await pool.query(users);
  await pool.query(parties);
  await pool.query(offices);
  await pool.query(candidates);
  await pool.query(votes);
  await pool.query(petitions);
  console.log('The tables are created');
};


createtableusers();

export default createtableusers;
