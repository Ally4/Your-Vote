import dotenv from 'dotenv';
import pool from '../database/config';
import {
  party,
  office,
  candidate,
  voteValidator,
  petition,
} from '../validators';


dotenv.config();

const errorRequest = (res, status = 400, error, message) => res.status(status).json({
  status,
  message,
  error,
});

const successRequest = (res, status = 200, data, message = 'Success') => res.status(status).json({
  status,
  message,
  data,
});

const joiError = (res, error) => res.status(400).json({
  status: 400,
  message: error.details[0].message.replace(/"/g, ''),
});

export default class Controllers {
  static async welcomeMessage(_req, res) {
    return successRequest(res, 200, undefined, 'WELCOME TO POLITICO');
  }

  static async createPoliticalParty(req, res) {
    try {
      const {
        error,
      } = party.validate(req.body);
      if (error) return joiError(res, error);
      const {
        rows,
      } = await pool.query('INSERT INTO parties (name, hqaddress, logourl) VALUES ($1, $2, $3)  RETURNING *', [req.body.name, req.body.hqaddress, req.body.logourl]);

      return successRequest(res, 201, rows[0], 'The party have been created successfully');
    } catch (error) {
      let message;
      let errorFull = error;
      if (error.code === '23505') {
        message = 'Party already exists';
        errorFull = undefined;
      }
      return errorRequest(res, 400, errorFull, message);
    }
  }

  static async createPoliticalOffice(req, res) {
    try {
      const {
        error,
      } = office.validate(req.body);
      if (error) return joiError(res, error);

      const {
        rows,
      } = await pool.query('INSERT INTO offices (type, name) VALUES ($1, $2) RETURNING *', [req.body.type, req.body.name]);
      return successRequest(res, 201, rows[0], 'The office to run for have been created successfully');
    } catch (error) {
      let message;
      let errorFull = error;
      if (error.code === '23505') {
        message = 'Office already exists';
        errorFull = undefined;
      }
      return errorRequest(res, 400, errorFull, message);
    }
  }

  static async vote(req, res) {
    try {
      if (req.isAdmin) {
        return errorRequest(res, 403, undefined, 'You are not allow to vote, as you are the admin');
      }
      const {
        error,
      } = voteValidator.validate(req.body);
      if (error) return joiError(res, error);

      const {
        rowCount
      } = await pool.query('SELECT * FROM candidates WHERE office = $1 AND candidate = $2', [req.body.office, req.body.candidate]);
      if (!rowCount) return errorRequest(res, 404, undefined, 'The candidate not found');
      const {
        rows
      } = await pool.query('INSERT INTO votes (createdby, office, candidate) VALUES ($1, $2, $3)  RETURNING *', [req.userId, req.body.office, req.body.candidate]);
      return successRequest(res, 201, rows[0], 'The vote have been recorded');
    } catch (err) {
      let message;
      let errorFull = err;
      if (err.code === '23505') {
        message = 'you are not allowed to vote for the office twice';
        errorFull = undefined;
      }
      return errorRequest(res, 403, errorFull, message);
    }
  }

  static async result(req, res) {
    try {
      const {
        rows,
        rowCount,
      } = await pool.query(`SELECT office, candidate, CAST(COUNT(*)AS Int) AS result 
      FROM votes WHERE office = $1 GROUP BY candidate, office`, [req.params.id]);
      if (!rowCount) return errorRequest(res, 404, undefined, 'Office not found');
      return successRequest(res, 200, rows);
    } catch (err) {
      return errorRequest(res, 400, err);
    }
  }

  static async results(req, res) {
    const {
      rows,
    } = await pool.query(`SELECT office, candidate, CAST(COUNT(*)AS Int) AS result 
  FROM votes GROUP BY candidate, office`);
    return successRequest(res, 200, rows);
  }


  static async editParty(req, res) {
    const {
      error,
    } = party.validate(req.body);
    if (error) return joiError(res, error);

    const {
      rows,
      rowCount,
    } = await pool.query('UPDATE parties SET name = $1 , hqaddress = $2, logourl = $3 WHERE id = $4  RETURNING *', [req.body.name, req.body.hqaddress, req.body.logourl, req.params.partyid]);
    if (!rowCount) return errorRequest(res, 404, undefined, 'The party is not in the system');
    return successRequest(res, 200, rows[0], 'The party have been updated successfully');
  }

  static async createACandidate(req, res) {
    try {
      const {
        error,
      } = candidate.validate(req.body);
      if (error) return joiError(res, error);
      const {
        rowCount: candidateExists,
      } = await pool.query('SELECT * FROM users WHERE id = $1', [req.body.candidate]);
      if (!candidateExists) return errorRequest(res, 404, undefined, 'Candidate not found');
      const {
        rowCount: officeExists,
      } = await pool.query('SELECT * FROM offices WHERE id = $1', [req.body.office]);
      if (!officeExists) return errorRequest(res, 404, undefined, 'Office not found');
      const {
        rowCount: partyExists,
      } = await pool.query('SELECT * FROM parties WHERE id = $1', [req.body.party]);
      if (!partyExists) return errorRequest(res, 404, undefined, 'Party not found');
      const {
        rows,
      } = await pool.query('INSERT INTO candidates (office, party, candidate) VALUES ($1, $2, $3)  RETURNING *', [req.body.office, req.body.party, req.body.candidate]);

      return successRequest(res, 201, rows[0], 'The candidate have been created successfully');
    } catch (err) {
      let message;
      let errorFull = err;
      if (err.code === '23505') {
        message = 'Candidate already exists';
        errorFull = undefined;
      }
      return errorRequest(res, 400, errorFull, message);
    }
  }

  static async createPetition(req, res) {
    const {
      error,
    } = petition.validate(req.body);
    if (error) return joiError(res, error);

    const {
      rows,
    } = await pool.query('INSERT INTO petitions (createdby, office, body) VALUES ($1, $2, $3)  RETURNING *', [req.body.createdby, req.body.office, req.body.body]);
    return successRequest(res, 201, rows[0], 'The petition have been created');
  }

  static async getPoliticalParties(req, res) {
    const {
      rows: parties,
      rowCount,
    } = await pool.query('SELECT * FROM parties');
    if (!rowCount) return errorRequest(res, 404, undefined, 'There is no party registered yet');
    return successRequest(res, 200, parties);
  }

  static async getPoliticalOffices(req, res) {
    const {
      rows: offices,
      rowCount,
    } = await pool.query('SELECT * FROM offices');
    if (!rowCount) return errorRequest(res, 404, undefined, 'There is no office registered yet');
    return successRequest(res, 200, offices);
  }

  static async getPartyById(req, res) {
    const {
      rows,
      rowCount,
    } = await pool.query('SELECT * FROM parties WHERE id = $1', [req.params.partyid]);
    if (!rowCount) return errorRequest(res, 404, undefined, 'There is no party registered yet');
    return successRequest(res, 200, rows[0]);
  }

  static async getOfficeById(req, res) {
    const {
      rows,
      rowCount,
    } = await pool.query('SELECT * FROM offices WHERE id = $1', [req.params.officeid]);
    if (!rowCount) return errorRequest(res, 404, undefined, 'There is no office registered yet');
    return successRequest(res, 200, rows[0]);
  }

  static async deletePoliticalParty(req, res) {
    try {
      const {
        rowCount,
      } = await pool.query('DELETE FROM parties WHERE id = $1', [req.params.partyid]);
      if (!rowCount) return errorRequest(res, 404, undefined, 'The political party you are trying to delete is not registered');
      return successRequest(res, 200, undefined, 'The party have been deleted');
    } catch (err) {
      return errorRequest(res, 400, err);
    }
  }

  static async deletePoliticalOffice(req, res) {
    try {
      const {
        rowCount,
      } = await pool.query('DELETE FROM offices WHERE id = $1', [req.params.officeid]);
      if (!rowCount) return errorRequest(res, 404, undefined, 'The political office you are trying to delete is not registered');
      return successRequest(res, 200, undefined, 'The office have been deleted');
    } catch (err) {
      return errorRequest(res, 400, err);
    }
  }

  static async deletePetition(req, res) {
    try {
      const {
        rowCount,
      } = await pool.query('DELETE FROM petitions WHERE id = $1', [req.params.petitionid]);
      if (!rowCount) return errorRequest(res, 404, undefined, 'The petition you are trying to delete is not published');
      return successRequest(res, 200, undefined, 'The petition have been deleted');
    } catch (err) {
      return errorRequest(res, 400, err);
    }
  }
}