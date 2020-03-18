import dotenv from 'dotenv';
import pool from './configuration';

dotenv.config();

const insertData = async () => {
  const admin = `INSERT INTO users (
        firstname ,
        lastname ,
        othername ,
        email ,
        password ,
        phonenumber ,
        passporturl ,
        isadmin
    ) VALUES ('babalao', 'mamalao', 'maestro', 'maestro@gmail.com', 'abcd1234', '0784403223', 'www.passport.com', true )`;
  const user = `INSERT INTO users (
        firstname ,
        lastname ,
        othername ,
        email ,
        password ,
        phonenumber ,
        passporturl
    ) VALUES ('elmaestro', 'delmuzika', 'grandmaitre', 'el.ally741@gmail.com@gmail.com', 'abcd1234', '0784403223', 'www.passport.com' )`;
  const party = `INSERT INTO parties(
        name ,
        hqaddress ,
        logourl
    ) VALUES ('Zaire', 'Kin', 'www.lobelayefrancais.org')`;
  const office = `INSERT INTO offices (
        type ,
        name 
    ) VALUES ('Great vilain', 'Ras al ghul')`;
  const candidate = `INSERT INTO candidates (
        office ,
        party ,
        candidate
    ) VALUES ( 1, 1, 1)`;
  const vote = `INSERT INTO votes (
      createdby ,
      office,
      candidate
  ) VALUES ( 1, 1, 1)`;
  const petition = `INSERT INTO petitions (
        createdby ,
        office ,
        body
    ) VALUES (1, 1, 'Chef de bande')`;

  await pool.query(admin);
  await pool.query(user);
  await pool.query(party);
  await pool.query(office);
  await pool.query(candidate);
  await pool.query(vote);
  await pool.query(petition);
  console.log('the insert was successfull');
};

insertData();

export default insertData;
