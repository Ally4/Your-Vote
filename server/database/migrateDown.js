import dotenv from 'dotenv';
import pool from './config';

dotenv.config();
(async () => {
  const drop = 'DROP TABLE IF EXISTS users, parties, offices, candidates, votes, petitions';
  await pool.query(drop);
})();
