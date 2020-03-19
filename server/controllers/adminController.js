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

  static async vote(req, res) {
    try{
    const headersToken = req.headers.authorization;
    const verifying = jwt.verify(headersToken, process.env.KEYWORD);
    if (verifying.isadmin === true) {
      return res.status(403).json({
        status: 403,
        message: 'You are not allow to vote, as you are the admin',
      });
    }
    const { error } = vote.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    if (verifying.id !== req.body.createdby) {
      return res.status(400).json({
        status: 400,
        message: 'Put in your correct id as createdby',
      });
    }
    await pool.query('INSERT INTO votes (createdby, office, candidate) VALUES ($1, $2, $3)', [req.body.createdby, req.body.office, req.body.candidate]);
    return res.status(200).json({
      status: 200,
      message: 'The vote have been recorded',
    });
  } catch {
    return res.status(409).json({
      status: 409,
      message: 'you are not allowed to vote for the office twice',
    });
  }
}

static async result(req, res) {
  const result = await pool.query(`SELECT office, candidate, CAST(COUNT(*)AS Int) AS result 
  FROM votes WHERE office = $1 GROUP BY candidate, office`, [req.params.id]);
  return res.status(200).json({
    status: 200,
    result: result.rows,
  })
}

static async results(req, res) {
  const results = await pool.query(`SELECT office, candidate, CAST(COUNT(*)AS Int) AS result 
  FROM votes WHERE office = $1 GROUP BY candidate, office`, [req.params.id]);
  return res.status(200).json({
    status: 200,
    results: results.rows,
  })
}


  static async editParty(req, res) {
    const headersToken = req.headers.authorization;
    const verifying = jwt.verify(headersToken, process.env.KEYWORD);
    if (verifying.isadmin === false) {
      return res.status(403).json({
        status: 403,
        message: 'You are not allow to change this status as you are not an admin',
      });
    }
    const finding = await pool.query('SELECT * FROM parties WHERE id = $1', [req.params.partyid]);
    if (!finding.rows[0]) {
      return res.status(404).json({
        status: 404,
        message: 'The party is not in the system',
      });
    }
    const { error } = party.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    await pool.query('UPDATE parties SET name = $1 , hqaddress = $2, logourl = $3 WHERE id = $4', [req.body.name, req.body.hqaddress, req.body.logourl, req.params.partyid]);
    return res.status(200).json({
      status: 200,
      data: {
        message: 'The party have been updated successfully',
      },
    });
  }

  static async createACandidate(req, res) {
    const headersToken = req.headers.authorization;
    const { error } = candidate.validate(req.body);
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

    const campaign = await pool.query('SELECT * FROM candidates WHERE candidate = $1', [req.body.candidate]);
    if (campaign) {
      return res.status(409).json({
        status: 409,
        message: 'this candidate is running already for a given possition',
      });
    }
    await pool.query('INSERT INTO candidates (office, party, candidate) VALUES ($1, $2, $3)', [req.body.office, req.body.party, req.body.candidate]);
    return res.status(201).json({
      status: 201,
      data: {
        message: 'The candidate have been created successfully',
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

  static async getPoliticalParties(req, res) {
    const politicalParties = await pool.query('SELECT * FROM parties');
    if (!politicalParties.rows[0]) {
      return res.status(404).json({
        status: 404,
        message: 'There is no party registered yet',
      });
    }
    return res.status(200).json({
      status: 200,
      data: {
        parties: politicalParties.rows,
      },
    });
  }

  static async getPoliticalOffices(req, res) {
    const politicalOffices = await pool.query('SELECT * FROM offices');
    if (!politicalOffices.rows[0]) {
      return res.status(404).json({
        status: 404,
        message: 'There is no office registered yet',
      });
    }
    return res.status(200).json({
      status: 200,
      data: {
        offices: politicalOffices.rows,
      },
    });
  }

  static async getPartyById(req, res) {
    const finding = await pool.query('SELECT * FROM parties WHERE id = $1', [req.params.partyid]);
    if (!finding.rows[0]) {
      return res.status(404).json({
        status: 404,
        message: 'The party is not yet in the system',
      });
    }
    return res.status(200).json({
      status: 200,
      data: {
        party: finding.rows[0],
      },
    });
  }

  static async getOfficeById(req, res) {
    const finding = await pool.query('SELECT * FROM offices WHERE id = $1', [req.params.officeid]);
    if (!finding.rows[0]) {
      return res.status(404).json({
        status: 404,
        message: 'The office to run for is not yet in the system',
      });
    }
    return res.status(200).json({
      status: 200,
      data: {
        office: finding.rows[0],
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
        message: 'The political party you are trying to delete is not registered',
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

  static async deletePoliticalOffice(req, res) {
    const headersToken = req.headers.authorization;
    const verifying = jwt.verify(headersToken, process.env.KEYWORD);
    const finding = await pool.query('SELECT * FROM offices WHERE id = $1', [req.params.officeid]);
    if (!finding.rows[0]) {
      return res.status(404).json({
        status: 404,
        message: 'The political office you are trying to delete is not registered',
      });
    }

    if (verifying.isadmin === false) {
      return res.status(403).json({
        status: 403,
        message: 'You are not allowed to proceed any further as you are not the admin',
      });
    }
    await pool.query('DELETE FROM offices WHERE id = $1', [req.params.officeid]);
    res.status(200).json({
      status: 200,
      message: 'The office have been deleted',
    });
  }

  static async deletePetition(req, res) {
    const headersToken = req.headers.authorization;
    const verifying = jwt.verify(headersToken, process.env.KEYWORD);
    const finding = await pool.query('SELECT * FROM petitions WHERE id = $1', [req.params.petitionid]);
    if (!finding.rows[0]) {
      return res.status(404).json({
        status: 404,
        message: 'The petition you are trying to delete is not registered yet',
      });
    }

    if (verifying.isadmin === false) {
      return res.status(403).json({
        status: 403,
        message: 'You are not allowed to proceed any further as you are not the admin',
      });
    }
    await pool.query('DELETE FROM petitions WHERE id = $1', [req.params.petitionid]);
    res.status(200).json({
      status: 200,
      message: 'The petition have been deleted',
    });
  }
}

export default adminJob;
