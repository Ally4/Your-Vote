import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import users from '../dummydata/users';


chai.use(chaiHttp); 
const reader = () => chai.request(app);

describe('Testing the user', () => {
  it('user should not be able to signup with an e-mail in use', (done) => {
    reader()
      .post('api/v1/auth/signup')
      .send(users[0])
      .end((error, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(409);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('user should not be able to signup with some missing field', (done) => {
    reader()
      .post('api/v1/auth/signup')
      .send(users[2])
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('user should not be able to signin if there is no password', (done) => {
    reader()
      .post('api/v1/auth/signin')
      .send(users[4])
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('user should not be able to signin if the email is uncomplete', (done) => {
    reader()
      .post('api/v1/auth/signin')
      .send(users[9])
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('user should not be able to signin if the password is uncomplete', (done) => {
    reader()
      .post('api/v1/auth/signin')
      .send(users[6])
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('user should not be able to signin if the password is wrong', (done) => {
    reader()
      .post('api/v1/auth/signin')
      .send(users[7])
      .end((error, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
});
