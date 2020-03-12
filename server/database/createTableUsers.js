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


  const party = `CREATE TABLE IF NOT EXISTS
        party (

            id serial primary key,
            name VARCHAR,
            hqaddress VARCHAR,
            logourl VARCHAR
        )`;

  const office = `CREATE TABLE IF NOT EXISTS
        office (

            id serial primary key,
            type VARCHAR,
            name VARCHAR
        )`;
  const candidate = `CREATE TABLE IF NOT EXISTS
        candidate (
            id serial primary key,
            office INT,
            party INT,
            candidate INT
        )`;
  const vote = `CREATE TABLE IF NOT EXISTS
        vote (
            id serial primary key,
            createdon TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            createdby INT,
            office INT,
            candidate INT
        )`;
  const petition = `CREATE TABLE IF NOT EXISTS
        petition (
            id serial primary key,
            createdon TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            createdby INT,
            office INT,
            body VARCHAR
        )`;
  await pool.query(users);

  await pool.query(parties);
  await pool.query(offices);

  await pool.query(candidate);
  await pool.query(vote);
  await pool.query(petition);
  console.log('The table is created');
};

createtableusers();

export default createtableusers;
