import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  timeout: 5000
});
const ACTIVE = 'ACTIVE';

describe('Given /api/companies', () => {
  describe('when a SUPER ADMIN is logged in', () => {
    beforeAll(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'super.admin@email.fake',
        password: 'supersecure'
      });

      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    describe('GET', () => {
      describe('GET /api/companies', () => {
        it('should return companies', async () => {
          const res = await axiosInstance.get('/api/companies');

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(15);
          expect(res.data.data.page).toBe(1);
          expect(res.data.data.length).toBe(15);

          expect(res.data.data.content[0]).toHaveProperty('uuid');
          expect(res.data.data.content[0]).toHaveProperty('name');
          expect(res.data.data.content[0]).toHaveProperty('createdAt');
          expect(res.data.data.content[0]).toHaveProperty('updatedAt');
          expect(res.data.data.content[0]).toHaveProperty('status');
        });
      });

      describe('GET /api/companies?page=4', () => {
        it('should return users from page 4', async () => {
          const res = await axiosInstance.get('/api/companies?page=4');

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(15);
          expect(res.data.data.page).toBe(4);
          expect(res.data.data.length).toBe(15);
        });
      });

      describe('GET /api/companies?uuid=:uuid', () => {
        let company;
        beforeEach(async () => {
          const res = await axiosInstance.get('/api/companies');
          [company] = res.data.data.content;
        });

        it('should return company with uuid', async () => {
          const res = await axiosInstance.get(`/api/companies?uuid=${company.uuid}`);

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(1);
          expect(res.data.data.page).toBe(1);
          expect(res.data.data.length).toBe(1);
        });
      });
    });

    describe('POST', () => {
      describe('POST /api/companies', () => {
        it('should add company', async () => {
          const postData = {
            name: 'Super Corp'
          };
          const res = await axiosInstance.post('/api/companies', postData);

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);

          expect(res.data.data).toHaveProperty('uuid');
          expect(res.data.data.name).toBe(postData.name);
          expect(res.data.data).toHaveProperty('createdAt');
          expect(res.data.data).toHaveProperty('updatedAt');
          expect(res.data.data).toHaveProperty('status');
          expect(res.data.data.status).toBe(ACTIVE);
        });
      });
    });

    describe('PUT', () => {
      let company;
      beforeEach(async () => {
        const res = await axiosInstance.get('/api/companies');
        [company] = res.data.data.content;
      });

      describe('PUT /api/companies', () => {
        it('should update user', async done => {
          const postData = {
            uuid: company.uuid,
            name: 'Super cool test corp',
            status: 'DELETED'
          };
          const res = await axiosInstance.put('/api/companies', postData);

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.uuid).toBe(postData.uuid);
          expect(res.data.data.name).toBe(postData.name);
          expect(res.data.data.status).toBe(postData.status);

          done();
        });
      });
    });

    describe('DELETE', () => {
      let company;
      beforeEach(async () => {
        const res = await axiosInstance.get('/api/companies');
        [company] = res.data.data.content;
      });

      describe('DELETE /api/companies', () => {
        it('should permanently remove companies from database', async () => {
          const postData = {
            uuid: company.uuid
          };
          const res = await axiosInstance.delete('/api/companies', {
            data: postData
          });

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);
          expect(res.data.data).toHaveProperty('message');
        });
      });
    });
  });

  /* company admin user */
  describe('when a "company admin" is logged in', () => {
    beforeEach(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'company.admin@email.fake',
        password: 'supersecure'
      });

      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    describe('/api/companies GET', () => {
      it('should return companies', async done => {
        const res = await axiosInstance.get('/api/companies');

        expect(res.status).toBe(200);
        expect(res.data.message).toBe(undefined);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.content.length).toBe(15);
        expect(res.data.data.page).toBe(1);
        expect(res.data.data.length).toBe(15);

        expect(res.data.data.content[0]).toHaveProperty('uuid');
        expect(res.data.data.content[0]).toHaveProperty('name');
        expect(res.data.data.content[0]).toHaveProperty('createdAt');
        expect(res.data.data.content[0]).toHaveProperty('updatedAt');
        expect(res.data.data.content[0]).toHaveProperty('status');

        done();
      });
    });
  });

  describe('when a "company regular user" is logged in', () => {
    beforeEach(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'company.regular@email.fake',
        password: 'supersecure'
      });

      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    describe('/api/companies GET', () => {
      it('should NOT return companies', async done => {
        try {
          await axiosInstance.get('/api/companies');
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
