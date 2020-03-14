import dotenv from 'dotenv';
import pool from './configuration';

dotenv.config();

const dropTables = async () => {
  const users = 'DROP TABLE IF EXISTS users';
  const parties = 'DROP TABLE IF EXISTS parties';
  const offices = 'DROP TABLE IF EXISTS offices';
  const candidates = 'DROP TABLE IF EXISTS candidates';
  const votes = 'DROP TABLE IF EXISTS votes';
  const petitions = 'DROP TABLE IF EXISTS petitions';

  await pool.query(users);
  await pool.query(parties);
  await pool.query(offices);
  await pool.query(candidates);
  await pool.query(votes);
  await pool.query(petitions);
  console.log('tables were deleted');
};
dropTables();

export default dropTables;
