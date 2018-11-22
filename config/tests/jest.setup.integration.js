const axios = require('axios');
const config = require('../../src/config');

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  timeout: 10000,
});

const deleteTestUser = () => {
  return new Promise(resolve => {
    axiosInstance
      .post('/api/auth/login', {
        email: 'super.admin@email.fake',
        password: 'supersecure',
      })
      .then(res => {
        axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
        return axiosInstance.delete('/api/users/remove_user_by_email', {
          data: {
            email: 'auth.test@test-email.fake',
          },
        });
      })
      .then(() => {
        return axiosInstance.delete('/api/users/remove_user_by_email', {
          data: {
            email: 'some.user@test-email.fake',
          },
        });
      })
      .then(resolve);
  });
};

module.exports = deleteTestUser;
