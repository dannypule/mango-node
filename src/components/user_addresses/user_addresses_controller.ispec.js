import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: `${config.baseURL}`,
  timeout: 5000,
});

describe('Given /api/user_addresses', () => {
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

    /* GET /api/user_addresses */
    describe('GET /api/user_addresses', () => {
      it('should return user addresses', done => {
        axiosInstance
          .get('/api/user_addresses')
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);

            expect(res.data.data.content.length).toBe(15);
            expect(res.data.data.page).toBe(1);

            expect(res.data.data.content).not.toBe(0);

            expect(res.data.data).toHaveProperty('count');
            expect(res.data.data).toHaveProperty('pages');
            expect(res.data.data).toHaveProperty('page');

            expect(res.data.data.content[0]).toHaveProperty('uuid');
            expect(res.data.data.content[0]).toHaveProperty('addressLine1');
            expect(res.data.data.content[0]).toHaveProperty('addressLine2');
            expect(res.data.data.content[0]).toHaveProperty('addressLine3');
            expect(res.data.data.content[0]).toHaveProperty('addressLine4');
            expect(res.data.data.content[0]).toHaveProperty('town');
            expect(res.data.data.content[0]).toHaveProperty('county');
            expect(res.data.data.content[0]).toHaveProperty('country');
            expect(res.data.data.content[0]).toHaveProperty('postCode');
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

    /* GET /api/user_addresses?page=4 */
    describe('GET /api/user_addresses?page=4', () => {
      it('should return user addresses from page 4', done => {
        axiosInstance
          .get('/api/user_addresses?page=4')
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

    /* GET /api/user_addresses?uuid=5 */
    describe('GET /api/user_addresses?uuid=5', () => {
      it('should return user with uuid of 5', done => {
        axiosInstance
          .get('/api/user_addresses?uuid=5')
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

    /* GET /api/user_addresses?userUuid=1 */
    describe('GET /api/user_addresses?userUuid=1', () => {
      it('should return user with userUuid of 1', done => {
        axiosInstance
          .get('/api/user_addresses?userUuid=1')
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);

            expect(res.data.data.content.length).not.toBe(0); // should have at least one

            done();
          })
          .catch(err => {
            console.log(err);
            done();
            throw new Error(err);
          });
      });
    });

    /* POST /api/user_addresses */
    xdescribe('POST /api/user_addresses', () => {
      it('should add user', done => {
        const postData = {
          phone: '840.649.2349',
          typeCode: 1,
          userUuid: 1,
        };
        axiosInstance
          .post('/api/user_addresses', postData)
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

    /* PUT /api/user_addresses */
    xdescribe('PUT /api/user_addresses', () => {
      it('should add user', done => {
        const postData = {
          uuid: 203,
          phone: '840.649.2348',
          typeCode: 3,
          userUuid: 14,
        };
        axiosInstance
          .put('/api/user_addresses', postData)
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

    /* DELETE /api/user_addresses */
    xdescribe('and user wants to permanently remove user phone number from database', () => {
      it('should remove user phone number from databse', done => {
        const postData = {
          uuid: newPhoneNumberUuid,
        };
        axiosInstance
          .delete('/api/user_addresses', {
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

  /* company admin user */
  xdescribe('and a "company admin" is logged in', () => {
    beforeAll(done => {
      axiosInstance
        .post('/api/auth/login', {
          email: 'company.admin@email.fake',
          password: 'supersecure',
        })
        .then(res => {
          axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
          done();
        });
    });

    /* GET /api/users */
    describe('/api/users GET', () => {
      it('should return users', done => {
        axiosInstance
          .get('/api/users')
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);

            expect(res.data.data.content.length).toBe(15);
            expect(res.data.data.page).toBe(1);
            expect(res.data.data.length).toBe(15);

            done();
          })
          .catch(err => {
            console.log(err);
            done();
            throw new Error(err);
          });
      });
    });
  });

  /* company regular user */
  xdescribe('and a "company regular user" is logged in', () => {
    beforeAll(done => {
      axiosInstance
        .post('/api/auth/login', {
          email: 'company.regular@email.fake',
          password: 'supersecure',
        })
        .then(res => {
          axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
          done();
        });
    });

    /* GET /api/users */
    xdescribe('/api/users GET', () => {
      it('should NOT return users', done => {
        axiosInstance
          .get('/api/users')
          .then(res => {
            done();
            throw new Error(res);
          })
          .catch(err => {
            const res = err.response;
            expect(res.status).toBe(403);
            expect(res.data.ok).toBe(false);
            expect(res.data).toHaveProperty('message');

            done();
          });
      });
    });
  });
});
