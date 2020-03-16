import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const connection = process.env.DATABASE_URL;
const pool = new Pool({ connectionString: connection });
pool.on('connect', () => {
    console.log('The connection is successfull');

});

export default pool;
