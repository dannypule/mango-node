import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: `${config.baseURL}`,
  timeout: 5000,
});

describe('Given AuthController', () => {
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

  /* login */
  describe('user tries to login', () => {
    const postData = {
      email: 'company.admin@email.fake',
      password: 'supersecure',
    };

    it('should log user in', (done) => {
      axiosInstance
        .post('/api/auth/login', postData)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);
          expect(res.data.data.token.includes('Bearer')).toBe(true);
          done();
        })
        .catch(err => {
          throw new Error(err);
        });
    });
  });

  /* register */
  describe('and user tries to register an account', () => {
    let postData;
    let newUserId;

    beforeEach(() => {
      postData = {
        firstName: 'test',
        lastName: 'user',
        email: 'test.user@email.fakez',
        password: 'supersecure',
        companyId: 1,
      };
    });

    afterEach((done) => {
      if (newUserId) {
        const postData = { id: newUserId };
        console.log(`Deleting user #${newUserId}`);
        axiosInstance
          .delete('/api/users/remove_user', {
            data: postData,
          })
          .then((res) => {
            if (res.data.ok) {
              console.log(`User #${newUserId} deleted`);
            } else {
              console.log(`Unable to delete user #${newUserId}`);
            }
            done();
          });
      } else {
        done();
      }
    });

    it('should register a new user', (done) => {
      axiosInstance
        .post('/api/auth/register', postData)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);
          // expect(res.data.).toBe(null);
          expect(res.data.data.token.includes('Bearer')).toBe(true);
          newUserId = res.data.data.user.id;
          done();
        })
        .catch(err => {
          throw new Error(err);
        });
    });
  });
});

