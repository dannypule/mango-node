import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: `${config.baseURL}`,
  timeout: 5000,
});

describe('Given /api/user_phone_numbers', () => {
  let newPhoneNumberId;

  describe('and a super user is logged in', () => {
    beforeAll((done) => {
      axiosInstance
        .post('/api/auth/login', {
          email: 'super.admin@email.fake',
          password: 'supersecure',
        })
        .then(res => {
          axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
          done();
        });
    });

    /* GET /api/user_phone_numbers */
    describe('GET /api/user_phone_numbers', () => {
      it('should return user phone numbers', (done) => {
        axiosInstance
          .get('/api/user_phone_numbers')
          .then((res) => {
            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);

            expect(res.data.data.content.length).toBe(15);
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

    /* GET /api/user_phone_numbers?page=4 */
    describe('GET /api/user_phone_numbers?page=4', () => {
      it('should return user phone numbers from page 4', (done) => {
        axiosInstance
          .get('/api/user_phone_numbers?page=4')
          .then((res) => {
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

    /* GET /api/user_phone_numbers?id=5 */
    describe('GET /api/user_phone_numbers?id=5', () => {
      it('should return user with id of 5', (done) => {
        axiosInstance
          .get('/api/user_phone_numbers?id=5')
          .then((res) => {
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

    /* GET /api/user_phone_numbers?userId=1 */
    describe('GET /api/user_phone_numbers?userId=1', () => {
      it('should return user with userId of 1', (done) => {
        axiosInstance
          .get('/api/user_phone_numbers?userId=1')
          .then((res) => {
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
      it('should add user', (done) => {
        const postData = {
          phone: '840.649.2349',
          typeCode: 1,
          userId: 1,
        };
        axiosInstance
          .post('/api/user_phone_numbers', postData)
          .then((res) => {
            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);

            newPhoneNumberId = res.data.data.content.id;

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
      it('should add user', (done) => {
        const postData = {
          id: 203,
          phone: '840.649.2348',
          typeCode: 3,
          userId: 14,
        };
        axiosInstance
          .put('/api/user_phone_numbers', postData)
          .then((res) => {
            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);

            expect(res.data.data.content.id).toBe(postData.id);

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
      it('should remove user phone number from databse', (done) => {
        const postData = {
          id: newPhoneNumberId,
        };
        axiosInstance
          .delete('/api/user_phone_numbers', {
            data: postData,
          })
          .then((res) => {
            if (res.data.ok) {
              console.log(`User phone number #${newPhoneNumberId} was deleted`);
            } else {
              console.log(`Unable to delete user phone number #${newPhoneNumberId}`);
            }

            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);

            done();
          })
          .catch(err => {
            console.log(err);
            console.log(`Error deleting user phone number #${newPhoneNumberId}`);
            done();
            throw new Error(err);
          });
      });
    });
  });
});
