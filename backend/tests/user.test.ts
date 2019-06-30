// tslint:disable:no-implicit-dependencies
import { expect } from 'chai';
import supertest from 'supertest';

const fakeUser = {
  email: 'someone@mail.com',
  username: 'Someone',
  password: '27sud72@7sdg72',
};

it('Should create an account', function() {
  const query = `mutation createAnAccount($data: CreateAnAccountInput!) {
    createAnAccount(data: $data)
  }`;

  const variables = {
    data: fakeUser,
  };

  return supertest(this.serverUrl)
    .post('/')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .timeout({ response: 2000, deadline: 5000 })
    .send(JSON.stringify({ query, variables }))
    .expect(200)
    .then((res) => {
      expect(res.status)
        .to.be.a('number')
        .that.equals(200);
      expect(res.body.data.createAnAccount).to.be.a('string');
    });
});

it('Should sign user in', function() {
  const query = `mutation signIn($data: SignInInput!) {
    signIn(data: $data)
  }`;

  const { username, password } = fakeUser;

  const variables = {
    data: { username, password },
  };

  return supertest(this.serverUrl)
    .post('/')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .timeout({ response: 2000, deadline: 5000 })
    .send(JSON.stringify({ query, variables }))
    .expect(200)
    .then((res) => {
      expect(res.status)
        .to.be.a('number')
        .that.equals(200);
      expect(res.body.data.signIn).to.be.a('string');
      this.token = res.body.data.signIn;
    });
});

it('Should return logged user info', function() {
  const query = `query me {
    me {
      username
      email
    }
  }`;

  const { username, email } = fakeUser;

  const variables = {};

  return supertest(this.serverUrl)
    .post('/')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .timeout({ response: 2000, deadline: 5000 })
    .set('Authorization', 'Bearer ' + this.token)
    .send(JSON.stringify({ query, variables }))
    .expect(200)
    .then((res) => {
      expect(res.status)
        .to.be.a('number')
        .that.equals(200);
      expect(res.body.data.me).to.eql({ username, email });
    });
});
