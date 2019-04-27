import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  timeout: 5000
});
const ACTIVE = 'ACTIVE';

describe('Given /api/projects', () => {
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
      describe('GET /api/projects', () => {
        it('should return projects', async done => {
          const res = await axiosInstance.get('/api/projects');

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(15);
          expect(res.data.data.page).toBe(1);
          expect(res.data.data.length).toBe(15);

          expect(res.data.data.content[0]).toHaveProperty('uuid');
          expect(res.data.data.content[0]).toHaveProperty('title');
          expect(res.data.data.content[0]).toHaveProperty('userUuid');
          expect(res.data.data.content[0]).toHaveProperty('companyUuid');
          expect(res.data.data.content[0]).toHaveProperty('createdAt');
          expect(res.data.data.content[0]).toHaveProperty('updatedAt');
          expect(res.data.data.content[0]).toHaveProperty('status');

          done();
        });
      });

      describe('GET /api/projects?page=4', () => {
        it('should return users from page 4', async done => {
          const res = await axiosInstance.get('/api/projects?page=4');

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(15);
          expect(res.data.data.page).toBe(4);
          expect(res.data.data.length).toBe(15);

          done();
        });
      });

      describe('GET /api/projects?uuid=:uuid', () => {
        let project;
        beforeEach(async done => {
          const res = await axiosInstance.get('/api/projects');
          [project] = res.data.data.content;
          done();
        });

        it('should return project with uuid', async done => {
          const res = await axiosInstance.get(`/api/projects?uuid=${project.uuid}`);

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(1);
          expect(res.data.data.page).toBe(1);
          expect(res.data.data.length).toBe(1);

          done();
        });
      });
    });

    describe('POST', () => {
      describe('POST /api/projects', () => {
        let user;
        let company;
        beforeEach(async done => {
          let res = await axiosInstance.get('/api/users');
          [user] = res.data.data.content;
          res = await axiosInstance.get('/api/companies');
          [company] = res.data.data.content;
          done();
        });

        it('should add projects', async done => {
          const postData = {
            title: 'Company-wide Office 365 Uninstallation',
            userUuid: user.uuid,
            companyUuid: company.uuid
          };
          const res = await axiosInstance.post('/api/projects', postData);

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);

          expect(res.data.data).toHaveProperty('uuid');
          expect(res.data.data.title).toBe(postData.title);
          expect(res.data.data.userUuid).toBe(postData.userUuid);
          expect(res.data.data.companyUuid).toBe(postData.companyUuid);
          expect(res.data.data).toHaveProperty('createdAt');
          expect(res.data.data).toHaveProperty('updatedAt');
          expect(res.data.data.status).toBe(ACTIVE);

          done();
        });
      });
    });

    describe('PUT', () => {
      let project;
      beforeEach(async done => {
        const res = await axiosInstance.get('/api/projects');
        [project] = res.data.data.content;
        done();
      });

      describe('PUT /api/projects', () => {
        it('should update user', async done => {
          const postData = {
            uuid: project.uuid,
            title: 'Company-wide Office 365 Removal',
            userUuid: project.userUuid,
            companyUuid: project.companyUuid,
            status: 'DELETED'
          };
          const res = await axiosInstance.put('/api/projects', postData);

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);

          expect(res.data.data).toHaveProperty('uuid');
          expect(res.data.data.title).toBe(postData.title);
          expect(res.data.data.userUuid).toBe(postData.userUuid);
          expect(res.data.data.companyUuid).toBe(postData.companyUuid);
          expect(res.data.data).toHaveProperty('createdAt');
          expect(res.data.data).toHaveProperty('updatedAt');
          expect(res.data.data.status).toBe(postData.status);

          done();
        });
      });
    });

    describe('DELETE', () => {
      let project;
      beforeEach(async done => {
        const res = await axiosInstance.get('/api/projects');
        [project] = res.data.data.content;
        done();
      });

      describe('DELETE /api/projects', () => {
        it('should permanently remove projects from database', async done => {
          const postData = {
            uuid: project.uuid
          };
          const res = await axiosInstance.delete('/api/projects', {
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
  });

  describe('when a "company admin" is logged in', () => {
    beforeEach(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'company.admin@email.fake',
        password: 'supersecure'
      });

      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    describe('/api/projects GET', () => {
      it('should return projects', async done => {
        const res = await axiosInstance.get('/api/projects');

        expect(res.status).toBe(200);
        expect(res.data.message).toBe(undefined);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.content.length).toBe(15);
        expect(res.data.data.page).toBe(1);
        expect(res.data.data.length).toBe(15);

        expect(res.data.data.content[0]).toHaveProperty('uuid');
        expect(res.data.data.content[0]).toHaveProperty('title');
        expect(res.data.data.content[0]).toHaveProperty('userUuid');
        expect(res.data.data.content[0]).toHaveProperty('companyUuid');
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

    describe('/api/projects GET', () => {
      it('should NOT return projects', async done => {
        try {
          await axiosInstance.get('/api/projects');
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
