import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../database/configuration';
import { party, office, candidate, vote, petition } from '../validators/createAndVoteValidator';


dotenv.config();

class adminJob {
  static async createPoliticalParty(req, res) {
    const headersToken = req.headers.authorization;
    const { error } = party.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    const verifying = jwt.verify(headersToken, process.env.KEYWORD);
    if (verifying.isadmin === false) {
      return res.status(403).json({
        status: 403,
        message: 'You are not the admin to proceed any further',
      });
    }
    await pool.query('INSERT INTO parties (name, hqaddress, logourl) VALUES ($1, $2, $3)', [req.body.name, req.body.hqaddress, req.body.logourl]);
    return res.status(201).json({
      status: 201,
      data: {
        message: 'The party have been created successfully',
      },
    });
  }

  static async createPoliticalOffice(req, res) {
    const headersToken = req.headers.authorization;
    const verifying = jwt.verify(headersToken, process.env.KEYWORD);
    if (verifying.isadmin === false) {
      return res.status(403).json({
        status: 403,
        message: 'You are not allowed to proceed any further',
      });
    }
    const { error } = office.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    await pool.query('INSERT INTO offices (type, name) VALUES ($1, $2)', [req.body.type, req.body.name]);
    return res.status(201).json({
      status: 201,
      data: {
        message: 'The office to run for have been created successfully',
      },
    });
  }

  static async createPetition(req, res) {
    const { error } = petition.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    await pool.query('INSERT INTO petitions (createdby, office, body) VALUES ($1, $2, $3)', [req.body.createdby, req.body.office, req.body.body]);
    return res.status(201).json({
      status: 201,
      data: {
        message: 'The petition have been created',
      },
    });
  }

  static async deletePoliticalParty(req, res) {
    const headersToken = req.headers.authorization;
    const verifying = jwt.verify(headersToken, process.env.KEYWORD);
    const finding = await pool.query('SELECT * FROM parties WHERE id = $1', [req.params.partyid]);
    if (!finding.rows[0]) {
      return res.status(404).json({
        status: 404,
        message: 'The political party you are trying to delete is not registered yet',
      });
    }

    if (verifying.isadmin === false) {
      return res.status(403).json({
        status: 403,
        message: 'You are not allowed to proceed any further',
      });
    }
    await pool.query('DELETE FROM parties WHERE id = $1', [req.params.partyid]);
    res.status(200).json({
      status: 200,
      message: 'The party have been deleted',
    });
  }
}

export default adminJob;
