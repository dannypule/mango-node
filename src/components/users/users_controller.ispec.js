import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: `${config.baseURL}`,
  timeout: 5000,
});

// todo delete user by email at beginning of tests

describe('Given /api/users', () => {
  beforeAll(done => {
    setTimeout(done, config.testDelay);
  });

  /* super user */
  describe('and a "super user" is logged in', () => {
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

    /* GET /api/users?page=4 */
    describe('and page 4 is requested', () => {
      it('should return users from page 4', done => {
        axiosInstance
          .get('/api/users?page=4')
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);

            expect(res.data.data.content.length).toBe(15);
            expect(res.data.data.page).toBe(4);
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

    /* GET /api/users?uuid=5 */
    describe('and user with uuid of 5 is requested', () => {
      it('should return user with uuid of 5', done => {
        axiosInstance
          .get('/api/users?uuid=5')
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);

            expect(res.data.data.content.length).toBe(1);
            expect(res.data.data.page).toBe(1);
            expect(res.data.data.length).toBe(1);

            done();
          })
          .catch(err => {
            console.log(err);
            done();
            throw new Error(err);
          });
      });
    });

    /* POST /api/users/add_user */
    describe('and user wants to add user', () => {
      let newUserUuid;

      it('should add user', done => {
        const postData = {
          firstName: 'some',
          lastName: 'user',
          email: 'some.user@test-email.fake',
          password: 'supersecure',
          companyUuid: 1,
        };
        axiosInstance
          .post('/api/users/add_user', postData)
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);

            expect(res.data.data.user).toBeTruthy();
            expect(res.data.data.token.includes('Bearer')).toBe(false);

            newUserUuid = res.data.data.user.uuid;

            done();
          })
          .catch(err => {
            console.log(err);
            done();
            throw new Error(err);
          });
      });

      /* PUT /api/users/update_user */
      describe('and user wants to update user', () => {
        it('should update user', done => {
          const postData = {
            uuid: newUserUuid,
            firstName: 'updatedFirstName',
            lastName: 'updatedLastName',
            email: 'updated.email@test-email.fake',
            userRoleCode: 40,
            status: 'INACTIVE',
          };
          axiosInstance
            .put('/api/users/update_user', postData)
            .then(res => {
              expect(res.status).toBe(200);
              expect(res.data.ok).toBe(true);

              expect(res.data.data.content.firstName).toBe(postData.firstName);
              expect(res.data.data.content.lastName).toBe(postData.lastName);
              expect(res.data.data.content.email).toBe(postData.email);
              expect(res.data.data.content.userRoleCode).toBe(postData.userRoleCode);
              expect(res.data.data.content.status).toBe(postData.status);

              done();
            })
            .catch(err => {
              console.log(err);
              done();
              throw new Error(err);
            });
        });
      });

      /* PUT /api/users/update_email */
      describe('and user wants to update email', () => {
        it('should update email', done => {
          const postData = {
            uuid: newUserUuid,
            email: 'email.is.updated@test-email.fake',
          };
          axiosInstance
            .put('/api/users/update_email', postData)
            .then(res => {
              expect(res.status).toBe(200);
              expect(res.data.ok).toBe(true);

              expect(res.data.data.content.email).toBe(postData.email);

              done();
            })
            .catch(err => {
              console.log(err);
              done();
              throw new Error(err);
            });
        });
      });

      /* PUT /api/users/update_name */
      describe("and user wants to update user's names", () => {
        it('should update name', done => {
          const postData = {
            uuid: newUserUuid,
            firstName: 'updated_first_name',
            lastName: 'updated_last_name',
          };
          axiosInstance
            .put('/api/users/update_name', postData)
            .then(res => {
              expect(res.status).toBe(200);
              expect(res.data.ok).toBe(true);

              expect(res.data.data.content.firstName).toBe(postData.firstName);
              expect(res.data.data.content.lastName).toBe(postData.lastName);

              done();
            })
            .catch(err => {
              console.log(err);
              done();
              throw new Error(err);
            });
        });
      });

      /* PUT /api/users/update_password */
      describe("and user wants to update user's password", () => {
        it('should update password', done => {
          const postData = {
            uuid: newUserUuid,
            password: 'football',
          };
          axiosInstance
            .put('/api/users/update_password', postData)
            .then(res => {
              expect(res.status).toBe(200);
              expect(res.data.ok).toBe(true);

              expect(res.data.data.content.uuid).toBe(postData.uuid);

              done();
            })
            .catch(err => {
              console.log(err);
              done();
              throw new Error(err);
            });
        });
      });

      /* PUT /api/users/update_status */
      describe("and user wants to update user's status", () => {
        it('should update status', done => {
          const postData = {
            uuid: newUserUuid,
            status: 'DELETED',
          };
          axiosInstance
            .put('/api/users/update_status', postData)
            .then(res => {
              expect(res.status).toBe(200);
              expect(res.data.ok).toBe(true);

              expect(res.data.data.content.uuid).toBe(postData.uuid);

              done();
            })
            .catch(err => {
              console.log(err);
              done();
              throw new Error(err);
            });
        });
      });

      /* DELETE /api/users/remove_user */
      describe('and user wants to permanently remove user from database', () => {
        it('should remove user from database', done => {
          const postData = {
            uuid: newUserUuid,
          };
          axiosInstance
            .delete('/api/users/remove_user', {
              data: postData,
            })
            .then(res => {
              if (res.data.ok) {
                console.log(`User #${newUserUuid} was deleted`);
              } else {
                console.log(`Unable to delete user #${newUserUuid}`);
              }

              expect(res.status).toBe(200);
              expect(res.data.ok).toBe(true);

              done();
            })
            .catch(err => {
              console.log(err);
              console.log(`Error deleting user #${newUserUuid}`);
              done();
              throw new Error(err);
            });
        });
      });
    });
  });

  /* company admin user */
  describe('and a "company admin" is logged in', () => {
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
  describe('and a "company regular user" is logged in', () => {
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
    describe('/api/users GET', () => {
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
