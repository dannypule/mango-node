import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: `${config.baseURL}`,
  timeout: 5000,
});

describe('Given /api/user_phone_numbers', () => {
  let newPhoneNumberUuid;

  describe('and a super user is logged in', () => {
    beforeAll(done => {
      axiosInstance
        .post('/api/auth/login', {
          email: 'super.admin@email.fake',
          password: 'supersecure',
        })
        .then(res => {
          axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
          setTimeout(done, config.testDelay);
        });
    });

    /* GET /api/user_phone_numbers */
    describe('GET /api/user_phone_numbers', () => {
      it('should return user phone numbers', done => {
        axiosInstance
          .get('/api/user_phone_numbers')
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);

            expect(res.data.data.content.length).toBe(15);
            expect(res.data.data.page).toBe(1);

            expect(res.data.data.content).not.toBe(0);

            expect(res.data.data.content[0]).toHaveProperty('uuid');
            expect(res.data.data.content[0]).toHaveProperty('phone');
            expect(res.data.data.content[0]).toHaveProperty('typeCode');
            expect(res.data.data.content[0]).toHaveProperty('userUuid');
            expect(res.data.data.content[0]).toHaveProperty('createdAt');
            expect(res.data.data.content[0]).toHaveProperty('updatedAt');
            expect(res.data.data.content[0]).toHaveProperty('status');

            done();
          })
          .catch(err => {
            console.log(err);
            done();
            throw new Error(err);
          });
      });
    });

    /* GET /api/user_phone_numbers?page=4 */
    describe('GET /api/user_phone_numbers?page=4', () => {
      it('should return user phone numbers from page 4', done => {
        axiosInstance
          .get('/api/user_phone_numbers?page=4')
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);

            expect(res.data.data.content.length).toBe(15);
            expect(res.data.data.page).toBe(4);

            done();
          })
          .catch(err => {
            console.log(err);
            done();
            throw new Error(err);
          });
      });
    });

    /* GET /api/user_phone_numbers?uuid=5 */
    describe('GET /api/user_phone_numbers?uuid=5', () => {
      it('should return user with uuid of 5', done => {
        axiosInstance
          .get('/api/user_phone_numbers?uuid=5')
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);

            expect(res.data.data.content.length).toBe(1);
            expect(res.data.data.page).toBe(1);

            done();
          })
          .catch(err => {
            console.log(err);
            done();
            throw new Error(err);
          });
      });
    });

    /* GET /api/user_phone_numbers?userUuid=1 */
    describe('GET /api/user_phone_numbers?userUuid=1', () => {
      it('should return user with userUuid of 1', done => {
        axiosInstance
          .get('/api/user_phone_numbers?userUuid=1')
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);

            expect(res.data.data.content.length).not.toBe(0);

            done();
          })
          .catch(err => {
            console.log(err);
            done();
            throw new Error(err);
          });
      });
    });

    /* POST /api/user_phone_numbers */
    describe('POST /api/user_phone_numbers', () => {
      it('should add user', done => {
        const postData = {
          phone: '840.649.2349',
          typeCode: 1,
          userUuid: 1,
        };
        axiosInstance
          .post('/api/user_phone_numbers', postData)
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);

            expect(res.data.data.content).toHaveProperty('uuid');
            expect(res.data.data.content).toHaveProperty('phone');
            expect(res.data.data.content).toHaveProperty('typeCode');
            expect(res.data.data.content).toHaveProperty('userUuid');
            expect(res.data.data.content).toHaveProperty('createdAt');
            expect(res.data.data.content).toHaveProperty('updatedAt');
            expect(res.data.data.content).toHaveProperty('status');

            newPhoneNumberUuid = res.data.data.content.uuid;

            done();
          })
          .catch(err => {
            console.log(err);
            done();
            throw new Error(err);
          });
      });
    });

    /* PUT /api/user_phone_numbers */
    describe('PUT /api/user_phone_numbers', () => {
      it('should add user', done => {
        const postData = {
          uuid: 203,
          phone: '840.649.2348',
          typeCode: 3,
          userUuid: 14,
        };
        axiosInstance
          .put('/api/user_phone_numbers', postData)
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);

            expect(res.data.data.content.uuid).toBe(postData.uuid);
            expect(res.data.data.content).toHaveProperty('phone');
            expect(res.data.data.content).toHaveProperty('typeCode');
            expect(res.data.data.content).toHaveProperty('userUuid');

            done();
          })
          .catch(err => {
            console.log(err);
            done();
            throw new Error(err);
          });
      });
    });

    /* DELETE /api/user_phone_numbers */
    describe('and user wants to permanently remove user phone number from database', () => {
      it('should remove user phone number from databse', done => {
        const postData = {
          uuid: newPhoneNumberUuid,
        };
        axiosInstance
          .delete('/api/user_phone_numbers', {
            data: postData,
          })
          .then(res => {
            if (res.data.ok) {
              console.log(`User phone number #${newPhoneNumberUuid} was deleted`);
            } else {
              console.log(`Unable to delete user phone number #${newPhoneNumberUuid}`);
            }

            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);

            done();
          })
          .catch(err => {
            console.log(err);
            console.log(`Error deleting user phone number #${newPhoneNumberUuid}`);
            done();
            throw new Error(err);
          });
      });
    });
  });
});

// const content = {
//   uuid: expect.,
//   phone: '840.649.2348',
//   typeCode: 3,
//   userUuid: 14,
//   createdAt: '2018-09-17T21:16:39.562Z',
//   updatedAt: '2018-09-19T21:51:45.001Z',
//   status: 'ACTIVE',
// };
