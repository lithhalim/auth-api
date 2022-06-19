'use strict';

process.env.SECRET = "TEST_SECRET";
const  db  = require('../src/database/LITH_DATABASE');
const supertest = require('supertest');
const { app } = require('../src/server/server');

const mockRequest = supertest(app);


beforeAll(async () => {
  await db.sync();
});


describe('API V1 SECTION ', () => {
//-------------------------------------CREATE SECTION --------------------------------------------------//
  it('CREATE FOOD API V1', async () => {   
    const response = await mockRequest.post('/api/v1/food').send({
      name: 'cryspy',
      calories: '500',
      type: 'fruit'
    });
    expect(response.status).toBe(201);
  });
//-------------------------------------GET ALL TEST---------------------------------------------------//
  it('GET ALL ELEMENT SECTION', async () => {
    const response = await mockRequest.get('/api/v1/food');
    expect(response.status).toBe(200);

  });
//---------------------------------------DELETE ONE ELEMENT------------------------------------------//
  it('CHECK DELETE ELMENT', async () => {
    const response = await mockRequest.delete('/api/v1/food/1');
    expect(response.status).toBe(204);
  });
//------------------------------------READ ONE ELEMNT -----------------------------------------------//
it('GET ONE ELEMENT', async () => {
    const response = await mockRequest.get('/api/v1/food/1');
    expect(response.status).toBe(200);
  });
//--------------------------------------UPDATE ONE ELEMENT -------------------------------------------//
it('UPDATE THE ELEMNT', async () => {
    const response = await mockRequest.put('/api/v1/food/1');
    expect(response.status).toBe(201);
  });



});

afterAll(async () => {
  await db.drop();
});
