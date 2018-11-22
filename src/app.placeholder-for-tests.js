// import {} from 'jest'
// import axios from 'axios';
// import chai from 'chai'
// import chaiHttp from 'chai-http'
// import app from './app'

// chai.use(chaiHttp)
// import faker from 'faker';
import supertest from 'supertest';

const request = supertest('http://localhost:5566');

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:5566/api',
//   headers: { 'Content-Type': 'application/json' },
//   timeout: 10000,
// })

xdescribe('When I make an API request', () => {
  beforeAll(done => {
    request.get('/').expect(200, (err, res) => {
      // console.log(res.body)
      expect(res.body.data).toBe('PONG');
      done();
    });

    // request
    //   .get('/')
    //   // .post('/auth/login')
    //   // .send({
    //   //   email: 'super.admin@email.fake',
    //   //   password: 'supersecure',
    //   // })
    //   // .set('Accept', 'application/json')
    //   .expect(200, (err, res) => {
    //     // console.log(res.body)
    //     expect(res.body.data).toBe('PONG');
    //     done();
    //   });
    // axiosInstance
    // .post('/auth/login', {
    //   email: 'super.admin@email.fake',
    //   password: 'supersecure',
    // })
    //   .then(res => {
    //     axiosInstance.defaults.headers.common['Authorization'] = res.data.data.token // eslint-disable-line
    //     done()
    //   })
    //   .catch(error => {
    //     console.log('faile to login', error) // eslint-disable-line
    //     done()
    //   })
  });

  xdescribe('to /users', () => {
    describe('and I make a GET request', () => {
      describe(`and I don't include a page number`, () => {
        // it('should return the expected data', done => {
        // axiosInstance
        //   .get('/users')
        //   .then(res => {
        //     expect(res.status).toBe(200)
        //     const resData = res.data.data
        //     expect(resData.users.length).not.toBe(0)
        //     done()
        //   })
        //   .catch(error => {
        //     expect(error).toBe(null)
        //     done()
        //   })
        // });
      });
      //   describe(`and I include a page number`, () => {
      //     it('should return the expected data and the correct page number', done => {
      //       axiosInstance
      //         .get('/users?page=2')
      //         .then(res => {
      //           expect(res.status).toBe(200)
      //           const resData = res.data.data
      //           expect(resData.users.length).not.toBe(0)
      //           expect(resData.page).toBe(2)
      //           done()
      //         })
      //         .catch(error => {
      //           expect(error).toBe(null)
      //           done()
      //         })
      //     })
      //   })
      // })
      // describe('and I make a POST request', () => {
      //   it('should add a new user and return the expected data', done => {
      //     const user = {
      //       firstName: 'duder',
      //       lastName: 'dudeson',
      //       email: faker.internet.email(),
      //       password: 'admin',
      //       userRoleCode: 30,
      //       companyUuid: 2,
      //     }

      //     axiosInstance
      //       .post('/users', user)
      //       .then(res => {
      //         expect(res.status).toBe(200)

      //         const returnedUser = res.data.data.user
      //         expect(returnedUser.firstName).toBe(user.firstName)
      //         expect(returnedUser.lastName).toBe(user.lastName)
      //         expect(returnedUser.email).toBe(user.email)
      //         expect(returnedUser.userRoleCode).toBe(user.userRoleCode)
      //         expect(returnedUser.companyUuid).toBe(user.companyUuid)

      //         done()
      //       })
      //       .catch(error => {
      //         expect(error).toBe(null)
      //         done()
      //       })
      //   })
    });
  });
});
