import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: `${config.baseURL}`,
  timeout: 5000,
});

describe('Given AuthController', () => {
  describe('when a super user is logged in', () => {
    beforeAll(done => {
      axiosInstance
        .post('/api/auth/login', {
          email: 'super.admin@email.fake',
          password: 'supersecure',
        })
        .then(res => {
          axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
          done();
        })
        .catch(() => {
          done();
        });
    });
  });

  /* /api/auth/login */
  describe('user tries to login', () => {
    const postData = {
      email: 'company.admin@email.fake',
      password: 'supersecure',
    };

    it('should log user in', async done => {
      const res = await axiosInstance.post('/api/auth/login', postData);

      expect(res.status).toBe(200);
      expect(res.data.ok).toBe(true);
      expect(res.data.data.token.includes('Bearer')).toBe(true);
      done();
    });
  });

  /* /api/auth/register */
  xdescribe('when a user tries to register an account', () => {
    const time = new Date().getTime();
    let postData;
    let res;

    beforeEach(async () => {
      const companies = await axiosInstance.get('/api/companies');
      postData = {
        firstName: 'test',
        lastName: 'user',
        email: `test_user_${time}@test-email.fake`,
        password: 'supersecure',
        companyUuid: companies.data.data.content[0].uuid,
        userRoleCode: 40,
        status: 'ACTIVE'
      };
      console.log(postData)
      console.log('++++++++++++++++++++++++++++++++')
    });

    it('should register a new user', async done => {
      res = await axiosInstance.post('/api/auth/register', postData);
      console.log(res)
      expect(res.status).toBe(200);
      expect(res.data.ok).toBe(true);
      expect(res.data.data.user).toBeTruthy();
      expect(res.data.data.token.includes('Bearer')).toBe(true);
      done();
    });
  });
});
