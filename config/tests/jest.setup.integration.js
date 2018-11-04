const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5566',
  timeout: 10000,
});

const deleteTestUser = () => {
  const deleteData = {
    email: 'auth.test@test-email.fake',
  };

  return new Promise(resolve => {
    axiosInstance.post('/api/auth/login', {
      email: 'super.admin@email.fake',
      password: 'supersecure',
    })
      .then(res => {
        axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
        axiosInstance
          .delete('http://localhost:5566/api/users/remove_user_by_email', {
            data: deleteData,
          })
          .then(resolve);
      });
  });
};

module.exports = deleteTestUser;
