import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: `${config.baseURL}`,
  timeout: 5000,
});

describe('Given /api/users', () => {
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
      describe('/api/users GET', () => {
        it('should return users', async done => {
          const res = await axiosInstance.get('/api/users');

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(15);
          expect(res.data.data.page).toBe(1);
          expect(res.data.data.length).toBe(15);

          expect(res.data.data.content[0]).toHaveProperty('uuid');
          expect(res.data.data.content[0]).toHaveProperty('firstName');
          expect(res.data.data.content[0]).toHaveProperty('lastName');
          expect(res.data.data.content[0]).toHaveProperty('email');
          expect(res.data.data.content[0]).toHaveProperty('createdAt');
          expect(res.data.data.content[0]).toHaveProperty('updatedAt');
          expect(res.data.data.content[0]).toHaveProperty('userRoleCode');
          expect(res.data.data.content[0]).toHaveProperty('status');

          done();
        });
      });

      describe('GET /api/users?page=4', () => {
        it('should return users from page 4', async done => {
          const res = await axiosInstance.get('/api/users?page=4');

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(15);
          expect(res.data.data.page).toBe(4);
          expect(res.data.data.length).toBe(15);

          done();
        });
      });

      describe('GET /api/users?uuid=:uuid', () => {
        let user;
        beforeEach(async done => {
          const res = await axiosInstance.get('/api/users');
          [user] = res.data.data.content;
          done();
        });

        it('should return user with uuid', async done => {
          const res = await axiosInstance.get(`/api/users?uuid=${user.uuid}`);

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(1);
          expect(res.data.data.page).toBe(1);
          expect(res.data.data.length).toBe(1);

          done();
        });
      });
    });

    describe('POST', () => {
      describe('POST /api/users/add_user', () => {
        it('should add user', async done => {
          const time = new Date().getTime();
          const postData = {
            firstName: 'some',
            lastName: 'user',
            email: `test_user_${time}@test-email.fake`,
            password: 'supersecure',
            companyUuid: 1,
          };
          const res = await axiosInstance.post('/api/users/add_user', postData);

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.user).toBeTruthy();
          expect(res.data.data.token.includes('Bearer')).toBe(false);

          done();
        });
      });
    });

    describe('PUT', () => {
      let user;
      beforeEach(async done => {
        const res = await axiosInstance.get('/api/users');
        [user] = res.data.data.content;
        done();
      });

      describe('PUT /api/users/update_user', () => {
        it('should update user', async done => {
          const postData = {
            uuid: user.uuid,
            firstName: 'updatedFirstName',
            lastName: 'updatedLastName',
            email: 'updated.email@test-email.fake',
            userRoleCode: 40,
            status: 'INACTIVE',
          };
          const res = await axiosInstance.put('/api/users/update_user', postData);

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.firstName).toBe(postData.firstName);
          expect(res.data.data.content.lastName).toBe(postData.lastName);
          expect(res.data.data.content.email).toBe(postData.email);
          expect(res.data.data.content.userRoleCode).toBe(postData.userRoleCode);
          expect(res.data.data.content.status).toBe(postData.status);

          done();
        });
      });

      describe('PUT /api/users/update_email', () => {
        it('should update email', async done => {
          const postData = {
            uuid: user.uuid,
            email: 'email.is.updated@test-email.fake',
          };
          const res = await axiosInstance.put('/api/users/update_email', postData);

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.email).toBe(postData.email);

          done();
        });
      });

      describe('PUT /api/users/update_name', () => {
        it('should update name', async done => {
          const postData = {
            uuid: user.uuid,
            firstName: 'updated_first_name',
            lastName: 'updated_last_name',
          };
          const res = await axiosInstance.put('/api/users/update_name', postData);

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.firstName).toBe(postData.firstName);
          expect(res.data.data.content.lastName).toBe(postData.lastName);

          done();
        });
      });

      describe('PUT /api/users/update_password', () => {
        it('should update password', async done => {
          const postData = {
            uuid: user.uuid,
            password: 'football',
          };
          const res = await axiosInstance.put('/api/users/update_password', postData);

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.uuid).toBe(postData.uuid);

          done();
        });
      });

      describe('PUT /api/users/update_status', () => {
        it('should update status', async done => {
          const postData = {
            uuid: user.uuid,
            status: 'DELETED',
          };
          const res = await axiosInstance.put('/api/users/update_status', postData);

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.uuid).toBe(postData.uuid);

          done();
        });
      });
    });

    describe('DELETE', () => {
      let user;
      beforeEach(async done => {
        const res = await axiosInstance.get('/api/users');
        [user] = res.data.data.content;
        done();
      });

      describe('DELETE /api/users/remove_user', () => {
        it('should permanently remove user from database', async done => {
          const postData = {
            uuid: user.uuid,
          };
          const res = await axiosInstance.delete('/api/users/remove_user', {
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

  /* company admin user */
  describe('when a "company admin" is logged in', () => {
    beforeEach(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'company.admin@email.fake',
        password: 'supersecure',
      });

      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    /* GET /api/users */
    describe('/api/users GET', () => {
      it('should return users', async done => {
        const res = await axiosInstance.get('/api/users');

        expect(res.status).toBe(200);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.content.length).toBe(15);
        expect(res.data.data.page).toBe(1);
        expect(res.data.data.length).toBe(15);

        done();
      });
    });
  });

  /* company regular user */
  describe('when a "company regular user" is logged in', () => {
    beforeEach(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'company.regular@email.fake',
        password: 'supersecure',
      });

      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    /* GET /api/users */
    describe('/api/users GET', () => {
      it('should NOT return users', async done => {
        try {
          await axiosInstance.get('/api/users');
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
