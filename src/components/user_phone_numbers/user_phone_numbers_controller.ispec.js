import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  timeout: 5000
});
const ACTIVE = 'ACTIVE';

describe('Given /api/user_phone_numbers', () => {
  /* SUPER ADMIN */
  describe('when a SUPER ADMIN is logged in', () => {
    let phoneNumbers;
    let users;

    beforeAll(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'super.admin@email.fake',
        password: 'supersecure'
      });
      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });
    beforeEach(async done => {
      const phoneNumberRes = await axiosInstance.get('/api/user_phone_numbers');
      const usersRes = await axiosInstance.get('/api/users');
      phoneNumbers = phoneNumberRes.data.data.content;
      users = usersRes.data.data.content;
      done();
    });

    /* ======================== GET ======================== */

    describe('GET /api/user_phone_numbers', () => {
      it('should return phoneNumbers', async done => {
        const res = await axiosInstance.get('/api/user_phone_numbers');

        expect(res.status).toBe(200);
        expect(res.data.message).toBe(undefined);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.content.length).toBe(15);
        expect(res.data.data.page).toBe(1);
        expect(res.data.data).toHaveProperty('count');
        expect(res.data.data).toHaveProperty('pages');
        expect(res.data.data).toHaveProperty('page');

        expect(res.data.data.content[0]).toHaveProperty('uuid');
        expect(res.data.data.content[0]).toHaveProperty('phone');
        expect(res.data.data.content[0]).toHaveProperty('typeCode');
        expect(res.data.data.content[0]).toHaveProperty('userUuid');
        expect(res.data.data.content[0]).toHaveProperty('createdAt');
        expect(res.data.data.content[0]).toHaveProperty('updatedAt');
        expect(res.data.data.content[0]).toHaveProperty('status');

        done();
      });
    });

    describe('GET /api/user_phone_numbers?page=4', () => {
      it('should return phoneNumbers from page 4', async done => {
        const res = await axiosInstance.get('/api/user_phone_numbers?page=4');

        expect(res.status).toBe(200);
        expect(res.data.message).toBe(undefined);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.content.length).toBe(15);
        expect(res.data.data.page).toBe(4);
        expect(res.data.data).toHaveProperty('count');
        expect(res.data.data).toHaveProperty('pages');
        expect(res.data.data).toHaveProperty('page');

        done();
      });
    });

    /* ======================== POST ======================== */

    /* POST /api/user_phone_numbers */
    describe('POST /api/user_phone_numbers', () => {
      it('should add phone number', async done => {
        const { uuid } = users[0];
        const postData = {
          phone: '840.649.2349',
          typeCode: 1,
          userUuid: uuid
        };
        const res = await axiosInstance.post('/api/user_phone_numbers', postData);

        expect(res.status).toBe(200);
        expect(res.data.message).toBe(undefined);
        expect(res.data.ok).toBe(true);

        expect(res.data.data).toHaveProperty('uuid');
        expect(res.data.data.phone).toBe(postData.phone);
        expect(res.data.data.typeCode).toBe(postData.typeCode);
        expect(res.data.data.userUuid).toBe(postData.userUuid);
        expect(res.data.data).toHaveProperty('createdAt');
        expect(res.data.data).toHaveProperty('updatedAt');
        expect(res.data.data.status).toBe(ACTIVE);

        done();
      });
    });

    /* ======================== PUT ======================== */

    describe('PUT /api/user_phone_numbers', () => {
      it('should update phone number', async done => {
        const { uuid } = phoneNumbers[0];
        const { uuid: userUuid } = users[0];

        const postData = {
          uuid,
          phone: '840.649.2348',
          typeCode: 3,
          userUuid
        };

        const res = await axiosInstance.put('/api/user_phone_numbers', postData);

        expect(res.status).toBe(200);
        expect(res.data.message).toBe(undefined);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.uuid).toBe(postData.uuid);
        expect(res.data.data.phone).toBe(postData.phone);
        expect(res.data.data.typeCode).toBe(postData.typeCode);
        expect(res.data.data.userUuid).toBe(postData.userUuid);
        expect(res.data.data).toHaveProperty('createdAt');
        expect(res.data.data).toHaveProperty('updatedAt');
        expect(res.data.data.status).toBe(ACTIVE);

        done();
      });
    });

    /* ======================== DELETE ======================== */

    describe('DELETE /api/user_phone_numbers', () => {
      it('should permanently remove phone number from databse', async done => {
        const postData = {
          uuid: phoneNumbers[0].uuid
        };

        const res = await axiosInstance.delete('/api/user_phone_numbers', {
          data: postData
        });

        expect(res.status).toBe(200);
        expect(res.data.message).toBe(undefined);
        expect(res.data.ok).toBe(true);

        expect(res.data.data).toHaveProperty('message');

        done();
      });
    });
  });

  /* COMPANY ADMIN */
  describe('when a COMPANY ADMIN is logged in', () => {
    beforeAll(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'company.admin@email.fake',
        password: 'supersecure'
      });
      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    /* ======================== GET ======================== */
    describe('GET /api/user_phone_numbers', () => {
      it('should return phoneNumbers', async done => {
        const res = await axiosInstance.get('/api/user_phone_numbers');
        expect(res.status).toBe(200);
        expect(res.data.message).toBe(undefined);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.content.length).toBe(15);
        expect(res.data.data.page).toBe(1);
        expect(res.data.data.length).toBe(15);

        done();
      });
    });
  });

  /* COMPANY REGULAR USER */
  describe('when a COMPANY REGULAR USER is logged in', () => {
    beforeAll(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'company.regular@email.fake',
        password: 'supersecure'
      });
      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    /* ======================== GET ======================== */

    describe('GET /api/user_phone_numbers', () => {
      it('should NOT return phoneNumbers', async done => {
        try {
          await axiosInstance.get('/api/user_phone_numbers');
        } catch (err) {
          expect(err.response.status).toBe(403);
          expect(err.response.data.ok).toBe(false);
          expect(err.response.data).toHaveProperty('message');
        } finally {
          done();
        }
      });
    });
  });
});
