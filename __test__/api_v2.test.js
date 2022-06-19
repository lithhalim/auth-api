'use strict';
process.env.SECRET = "TEST_SECRET";
const { app } = require('../src/server/server'); 
const supertest = require('supertest');
const  sequelize  = require('../src/database/LITH_DATABASE');

const request = supertest(app);
let id;
let Users = {
    admin: { username: 'admin', password: 'password', role: 'admin' },
    editor: { username: 'editor', password: 'password', role: 'editor' },
    writer: { username: 'writer', password: 'password', role: 'writer' },
    user: { username: 'user', password: 'password', role: 'user' },
};
let accessToken = null;

beforeAll(async () => {
  await sequelize.sync();
});
  
afterAll(async () => {
    await sequelize.drop();
  });
  


Object.keys(Users).forEach(element => {


//-----------------------------------------CREATE NEW USER-------------------------------------------//
    describe('TESTING OF V2 CHECK',()=>{
        it ('CREATE NEW ', async () => {
            //FIRST START WITH SIGNUP WITH USER AFTER THAT GET TOKEN 
            let auth = await request.post('/signup').send(Users[element]);
            let userToken = auth.body.token;
            const response = await request.post('/api/v2/food').send({
                username: "lith",
                password : "123",
                role:"admin"
            }).set("Authorization", `Bearer ${userToken}`);
            id = response.body.id;
            //CHECK FOR CABIBILTY OF USER 
            if (element === 'writer' || element === 'editor'||element === 'user') {
                expect(response.status).not.toBe(500);
            } else {
                expect(response.status).not.toBe(201);
            } 
        });
//-----------------------------------------GET USER CHECK---------------------------------------------//
        it('GET ALL ',async()=>{
            let auth = await request.post('/signin').auth(Users[element].username,Users[element].password);
            let  userToken = auth.body.token;
            const response = await request.get('/api/v2/food').set('Authorization', `Bearer ${userToken}`)
            expect(response.status).not.toBe(500)
        });

        it('GET ONE',async()=>{
            let Auth = await request.post('/signin').auth(Users[element].username,Users[element].password);
            let  userToken = Auth.body.token;
            const response = await request.get(`/api/v2/food/${id}`).set('Authorization', `Bearer ${userToken}`)
            expect(response.status).not.toBe(500)
        })
//---------------------------------------DELETE USER CHECK -------------------------------------------//
        it ('DELETE ACCOUNT',async()=>{
            //DO SIGN IN TO GET BAREAR -->BASIC AUTH -->BAREAR AUTH
            let Auth = await request.post('/signin').auth(Users[element].username,Users[element].password);
            let  userToken = Auth.body.token;
            const response = await request.delete(`/api/v2/food/${id}`).set("Authorization", `Bearer ${userToken}`);
            //CHECK ON CAPABILITY OF THE USER SELECT    
              if (Users[element].role === 'admin') {
                expect(response.status).not.toBe(500);
            } else {
                expect(response.status).not.toBe(204);
            }
        })   
//------------------------------------UPDATE USER CHECK------------------------------------------------// 
       it ('UPDATE ACCOUNT', async () => {
        //DO SIGN IN TO GET BAREAR -->BASIC AUTH -->BAREAR AUTH
        let Auth = await request.post('/signin').auth(Users[element].username,Users[element].password);
        let  userToken = Auth.body.token;
        const response = await request.put(`/api/v2/food/${id}`).send({
            username: "lith",
            password : "123",
            role: "user"
        }).set("Authorization", `Bearer ${userToken}`);
        //CHECK ON CAPABILITY OF THE USER SELECT    
        if (element == 'editor'||element == 'admin') {
            expect(response.status).not.toBe(500);
        } else {
            expect(response.status).not.toBe(201);
        }
    });
    
    
    })
});



