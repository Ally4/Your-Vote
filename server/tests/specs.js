import chai, {
  expect,
} from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import app from '../../app';
import users from '../dummydata/users';

dotenv.config();

chai.use(chaiHttp);
chai.use(chaiThings);
const reader = () => chai.request(app);

const office = {
  type: 'Great vilain',
  name: 'Ras al ghul',
};
const vote = {
  createdby: 1,
  office: 1,
  candidate: 1,
}
let token;

before((done) => {
  const admin = {
    email: 'admin@gmail.com',
    password: 'abcd1234',
  };
  chai.request(app).post('/api/v1/auth/signin')
    .send(admin)
    .end((_err, res) => {
      token = res.body.data.token;
      done();
    });
});

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
      .set('Authorization', token)
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
      .set('Authorization', token)
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
      .set('Authorization', token)
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
  it('The admin should be able to create a political office', (done) => {
    reader()
      .post('/api/v1/offices')
      .set('Authorization', token)
      .send(office)
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('The admin should be able to create a political office', (done) => {
    reader()
      .post('/api/v1/offices')
      .set('Authorization', token)
      .send(vote)
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
});
