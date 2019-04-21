import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: `${config.baseURL}`,
  timeout: 5000,
});
const ACTIVE = 'ACTIVE';

describe('Given /api/user_projects', () => {
  describe('when a SUPER ADMIN is logged in', () => {
    beforeAll(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'super.admin@email.fake',
        password: 'supersecure',
      });

      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    describe('GET', () => {
      describe('GET /api/user_projects', () => {
        it('should return user_projects', async done => {
          const res = await axiosInstance.get('/api/user_projects');

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(15);
          expect(res.data.data.page).toBe(1);
          expect(res.data.data.length).toBe(15);

          expect(res.data.data.content[0]).toHaveProperty('uuid');
          expect(res.data.data.content[0]).toHaveProperty('userUuid');
          expect(res.data.data.content[0]).toHaveProperty('projectUuid');
          expect(res.data.data.content[0]).toHaveProperty('createdAt');
          expect(res.data.data.content[0]).toHaveProperty('updatedAt');
          expect(res.data.data.content[0]).toHaveProperty('status');

          done();
        });
      });

      describe('GET /api/user_projects?page=4', () => {
        it('should return users from page 4', async done => {
          const res = await axiosInstance.get('/api/user_projects?page=4');

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(15);
          expect(res.data.data.page).toBe(4);
          expect(res.data.data.length).toBe(15);

          done();
        });
      });

      describe('GET /api/user_projects?uuid=:uuid', () => {
        let userProject;
        beforeEach(async done => {
          const res = await axiosInstance.get('/api/user_projects');
          [userProject] = res.data.data.content;
          done();
        });

        it('should return userProject with uuid', async done => {
          const res = await axiosInstance.get(`/api/user_projects?uuid=${userProject.uuid}`);

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(1);
          expect(res.data.data.page).toBe(1);
          expect(res.data.data.length).toBe(1);

          done();
        });
      });

      describe('GET /api/user_projects?projectUuid=:projectUuid', () => {
        let userProject;
        beforeEach(async done => {
          const res = await axiosInstance.get('/api/user_projects');
          [userProject] = res.data.data.content;
          done();
        });

        it('should return userProject with projectUuid', async done => {
          const res = await axiosInstance.get(`/api/user_projects?projectUuid=${userProject.projectUuid}`);

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBeGreaterThanOrEqual(1);
          expect(res.data.data.content.length).toBeGreaterThanOrEqual(1);
          expect(res.data.data.content.length).toBeGreaterThanOrEqual(1);

          done();
        });
      });

      describe('GET /api/user_projects?userUuid=:userUuid', () => {
        let userProject;
        beforeEach(async done => {
          const res = await axiosInstance.get('/api/user_projects');
          [userProject] = res.data.data.content;
          done();
        });

        it('should return userProject with userUuid', async done => {
          const res = await axiosInstance.get(`/api/user_projects?userUuid=${userProject.userUuid}`);

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBeGreaterThanOrEqual(1);
          expect(res.data.data.content.length).toBeGreaterThanOrEqual(1);
          expect(res.data.data.content.length).toBeGreaterThanOrEqual(1);

          done();
        });
      });
    });

    describe('POST', () => {
      describe('POST /api/user_projects', () => {
        let users;
        let project;
        beforeEach(async done => {
          let res = await axiosInstance.get('/api/users');
          [users] = res.data.data.content;
          res = await axiosInstance.get('/api/projects');
          [project] = res.data.data.content;
          done();
        });

        it('should add user_project', async done => {
          const postData = {
            userUuid: users.uuid,
            projectUuid: project.uuid,
          };
          const res = await axiosInstance.post('/api/user_projects', postData);

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data).toHaveProperty('uuid');
          expect(res.data.data.userUuid).toBe(postData.userUuid);
          expect(res.data.data.projectUuid).toBe(postData.projectUuid);
          expect(res.data.data).toHaveProperty('createdAt');
          expect(res.data.data).toHaveProperty('updatedAt');
          expect(res.data.data.status).toBe(ACTIVE);

          done();
        });
      });
    });

    describe('PUT', () => {
      let userProject;
      beforeEach(async done => {
        const res = await axiosInstance.get('/api/user_projects');
        [userProject] = res.data.data.content;
        done();
      });

      describe('PUT /api/user_projects', () => {
        it('should update user', async done => {
          const postData = {
            uuid: userProject.uuid,
            userUuid: userProject.userUuid,
            projectUuid: userProject.projectUuid,
            status: 'DELETED',
          };
          const res = await axiosInstance.put('/api/user_projects', postData);

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data).toHaveProperty('uuid');
          expect(res.data.data.userUuid).toBe(postData.userUuid);
          expect(res.data.data.projectUuid).toBe(postData.projectUuid);
          expect(res.data.data).toHaveProperty('createdAt');
          expect(res.data.data).toHaveProperty('updatedAt');
          expect(res.data.data.status).toBe('DELETED');
          done();
        });
      });
    });

    describe('DELETE', () => {
      let userProject;
      beforeEach(async done => {
        const res = await axiosInstance.get('/api/user_projects');
        [userProject] = res.data.data.content;
        done();
      });

      describe('DELETE /api/user_projects', () => {
        it('should permanently remove user_projects from database', async done => {
          const postData = {
            uuid: userProject.uuid,
          };
          const res = await axiosInstance.delete('/api/user_projects', {
            data: postData,
          });

          expect(res.status).toBe(200);
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
        password: 'supersecure',
      });

      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    describe('/api/user_projects GET', () => {
      it('should return user_projects', async done => {
        const res = await axiosInstance.get('/api/user_projects');

        expect(res.status).toBe(200);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.content.length).toBe(15);
        expect(res.data.data.page).toBe(1);
        expect(res.data.data.length).toBe(15);

        expect(res.data.data.content[0]).toHaveProperty('uuid');
        expect(res.data.data.content[0]).toHaveProperty('userUuid');
        expect(res.data.data.content[0]).toHaveProperty('projectUuid');
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
        password: 'supersecure',
      });

      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    describe('/api/user_projects GET', () => {
      it('should NOT return user_projects', async done => {
        try {
          await axiosInstance.get('/api/user_projects');
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
