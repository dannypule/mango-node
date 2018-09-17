import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: `${config.baseURL}`,
  timeout: 5000,
});

describe('Given /api/users', () => {
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

    /* GET /api/users */
    describe('/api/users GET', () => {
      it('should return users', (done) => {
        axiosInstance
          .get('/api/users')
          .then((res) => {
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
      it('should return users from page 4', (done) => {
        axiosInstance
          .get('/api/users?page=4')
          .then((res) => {
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

    /* GET /api/users?id=5 */
    describe('and user with id of 5 is requested', () => {
      it('should return user with id of 5', (done) => {
        axiosInstance
          .get('/api/users?id=5')
          .then((res) => {
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
      let newUserId;

      afterAll((done) => {
        if (newUserId) {
          const postData = { id: newUserId };
          console.log(`Deleting user #${newUserId}`);
          axiosInstance
            .delete('/api/users/remove_user', {
              data: postData,
            })
            .then((res) => {
              if (res.data.ok) {
                console.log(`User #${newUserId} was deleted`);
              } else {
                console.log(`Unable to delete user #${newUserId}`);
              }
              done();
            });
        } else {
          done();
        }
      });

      it('should add user', (done) => {
        const postData = {
          firstName: 'some',
          lastName: 'user',
          email: 'some.user@email.fakez',
          password: 'supersecure',
          companyId: 1,
        };
        axiosInstance
          .post('/api/users/add_user', postData)
          .then((res) => {
            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);
            expect(res.data.data.user).toBeTruthy();
            expect(res.data.data.token.includes('Bearer')).toBe(false);
            newUserId = res.data.data.user.id;
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
        it('should update user', (done) => {
          const postData = {
            id: newUserId,
            firstName: 'updatedFirstName',
            lastName: 'updatedLastName',
            email: 'updated.email@email.fakez',
            userRoleCode: 40,
            status: 'INACTIVE',
          };
          axiosInstance
            .put('/api/users/update_user', postData)
            .then((res) => {
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
        it('should update email', (done) => {
          const postData = {
            id: newUserId,
            email: 'email.is.updated@email.fakez',
          };
          axiosInstance
            .put('/api/users/update_email', postData)
            .then((res) => {
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

      /* PUT /api/users/update_user */
      describe('and user wants to update user', () => {
        it('should update name', (done) => {
          const postData = {
            id: newUserId,
            firstName: 'updated_first_name',
            lastName: 'updated_last_name',
          };
          axiosInstance
            .put('/api/users/update_user', postData)
            .then((res) => {
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
    });
  });
});

