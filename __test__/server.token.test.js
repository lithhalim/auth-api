'use strict';

process.env.SECRET = "TEST_SECRET";
const {app}  = require('../src/server/server'); 
const supertest = require('supertest');
const  sequelize  = require('../src/database/LITH_DATABASE');
const mockRequest = supertest(app);

let userData = {
  testUser: { username: 'username', password: 'password' , role:'admin'},
};
let accessToken = null;

beforeAll(async () => {
  await sequelize.sync();
});
 








describe('AUTHNTICATION', () => {
//----------------------------------------CREATE NEW --------------------------------------------------//
  it('CREATE USER ', async () => {
    const response = await mockRequest.post('/signup').send(userData.testUser);
    const userObject = response.body;
    expect(response.status).not.toBe(500);
  });
//----------------------------------------USE BASIC AUTH ----------------------------------------------//
  it('SIGN IN BASIC AUTH ', async () => {
    let username=userData.testUser.username;
    let password=userData.testUser.password;
    const response = await mockRequest.post('/signin').auth(username, password);
    expect(response.status).not.toBe(500);
  });
//---------------------------------------USE TOKEN SIGN IN --------------------------------------------//
  it('GET USER AFTER GET BARERAR', async () => {
    let { username, password } = userData.testUser;
    const response = await mockRequest.post('/signin').auth(username, password);
    //GET THE BARER AFTER ACSESS
    accessToken = response.body.token;

    const bearerResponse = await mockRequest
      .get('/users')//GET USER AG=FTER AUTHRIZATION
      .set('Authorization', `Bearer ${accessToken}`);//(SET)USE TO AUTHRIZATION 
    expect(bearerResponse.status).not.toBe(500);
  });
  //--------------------------------------GET USER AFTER GET TOKEN------------------------------------//
  it('GET USER WITH VALID TOKEN', async () => {
    const response = await mockRequest.get('/users')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(response.status).not.toBe(500);//CAN ACCEPT ANY VALUE BUT NOT FALSE
    expect(response.body).toBeTruthy();
    expect(response.body).toEqual(expect.anything());
  });
//----------------------------------------GET SECRET WITH UN VALID TOKEN------------------------------//
  it('secret rout with wrong barear ', async () => {
    const response = await mockRequest.get('/secret')
      .set('Authorization', `bearer accessgranted`);
  });
});

