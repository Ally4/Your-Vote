import dotenv from 'dotenv';
import pool from './config';

dotenv.config();


(async () => {
  const admin = `INSERT INTO users (
        firstname ,
        lastname ,
        othername ,
        email ,
        password ,
        phonenumber ,
        passporturl ,
        isadmin
    ) VALUES ('babalao', 'mamalao', 'maestro', 'admin@gmail.com', '$2b$10$3xFArzqlAyGKXkD91H2S3Ot5Jgbskms705z/09aQEZp5i2lbU0ySG', '0784403223', 'www.passport.com', true )`;
  const user = `INSERT INTO users (
        firstname ,
        lastname ,
        othername ,
        email ,
        password ,
        phonenumber ,
        passporturl,
        isadmin
    ) VALUES ('elmaestro', 'delmuzika', 'grandmaitre', 'el.ally741@gmail.com', '$2b$10$3xFArzqlAyGKXkD91H2S3Ot5Jgbskms705z/09aQEZp5i2lbU0ySG', '0784403223', 'www.passport.com', null )`;
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

})();
