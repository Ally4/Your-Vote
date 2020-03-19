import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import app from '../../app';
import users from '../dummydata/users';


chai.use(chaiHttp);
chai.use(chaiThings);
const reader = () => chai.request(app);

const user = {
  firstname: 'Allybomayee',
  lastname: 'troptop',
  othername: 'naalanalan',
  email: 'allybomayee@gmail.com',
  password: 'Allahistheking741',
  phonenumber: '0784403223',
  passporturl: 'hgjhghjgfkjhfd',
};
describe('Testing the user', () => {
  it('The user should be able to get the welcome message', (done) => {
    reader()
      .get('/')
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('User should not be able to signup with a missing field', (done) => {
    reader()
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(201);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('user should be able to signup with all information required', (done) => {
    reader()
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, res) => {
        expect(res).to.have.status(409);
        console.log(`the status ${res}`);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(409);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('user should not be able to signup with some missing field', (done) => {
    reader()
      .post('/api/v1/auth/signup')
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
      .post('/api/v1/auth/signin')
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
      .post('/api/v1/auth/signin')
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
      .post('/api/v1/auth/signin')
      .send(users[7])
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
      .post('/api/v1/auth/signin')
      .send(users[8])
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
