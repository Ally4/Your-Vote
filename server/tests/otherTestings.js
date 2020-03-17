import chai, { expect } from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../../app';
import users from '../dummydata/users';

dotenv.config();

chai.use(chaiHttp);
const reader = () => chai.request(app);

const admin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVsbWFlc3Ryb0BnbWFpbC5jb20iLCJpc2FkbWluIjoidHJ1ZSIsImlhdCI6MTU4NDAwODYyMn0.i-vD7TiplscSmaLeWv_rx8IjyrTv2plHUmtAMvn4Nwo';

const fakeToken = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsbHlib21heWVlaHRAZ21haWwuY29tIiwiaXNhZG1pbiI6ImZhbHNlIiwiaWF0IjoxNTg0MDA2NTA3fQ.s5rpzz-9CZc0GBtI8KBhh6biUSlsPROSu0KokpnsQso';

const noToken = '';
describe('The testing for the token', () => {
  it('The user is not perfoming anything if there is no token', (done) => {
    reader()
      .patch('/api/v1/party/1')
      .end((error, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('The user is not perfoming anything if there is a fake token', (done) => {
    reader()
      .patch('/api/v1/party/1')
      .set('Authorization', users[17])
      .end((error, res) => {
        console.log(`the status ${users[17]}`);
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('The admin should be able to delete a political party', (done) => {
    reader()
      .delete('/api/v1/parties/1')
      .set('Authorization', admin)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('The admin should be able to delete a political office', (done) => {
    reader()
      .delete('/api/v1/offices/1')
      .set('Authorization', admin)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('The admin should be able to delete a petition', (done) => {
    reader()
      .delete('/api/v1/petitions/1')
      .set('Authorization', admin)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
});
