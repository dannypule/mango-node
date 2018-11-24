import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: `${config.baseURL}`,
  timeout: 5000,
});
const ACTIVE = 'ACTIVE';

describe('Given /api/user_addresses', () => {
  /* SUPER ADMIN */
  describe('and a SUPER ADMIN is logged in', () => {
    let addresses;
    let users;

    beforeAll(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'super.admin@email.fake',
        password: 'supersecure',
      });
      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });
    beforeEach(async done => {
      const addressRes = await axiosInstance.get('/api/user_addresses');
      const usersRes = await axiosInstance.get('/api/users');
      addresses = addressRes.data.data.content;
      users = usersRes.data.data.content;
      done();
    });

    /* ======================== GET ======================== */

    describe('GET /api/user_addresses', () => {
      it('should return addresses', async done => {
        const res = await axiosInstance.get('/api/user_addresses');

        expect(res.status).toBe(200);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.content.length).toBe(15);
        expect(res.data.data.page).toBe(1);

        expect(res.data.data.content).not.toBe(0);

        expect(res.data.data).toHaveProperty('count');
        expect(res.data.data).toHaveProperty('pages');
        expect(res.data.data).toHaveProperty('page');

        expect(res.data.data.content[0]).toHaveProperty('uuid');
        expect(res.data.data.content[0]).toHaveProperty('addressLine1');
        expect(res.data.data.content[0]).toHaveProperty('addressLine2');
        expect(res.data.data.content[0]).toHaveProperty('addressLine3');
        expect(res.data.data.content[0]).toHaveProperty('addressLine4');
        expect(res.data.data.content[0]).toHaveProperty('town');
        expect(res.data.data.content[0]).toHaveProperty('county');
        expect(res.data.data.content[0]).toHaveProperty('country');
        expect(res.data.data.content[0]).toHaveProperty('postCode');
        expect(res.data.data.content[0]).toHaveProperty('typeCode');
        expect(res.data.data.content[0]).toHaveProperty('userUuid');
        expect(res.data.data.content[0]).toHaveProperty('createdAt');
        expect(res.data.data.content[0]).toHaveProperty('updatedAt');
        expect(res.data.data.content[0]).toHaveProperty('status');

        done();
      });
    });

    describe('GET /api/user_addresses?page=4', () => {
      it('should return addresses from page 4', async done => {
        const res = await axiosInstance.get('/api/user_addresses?page=4');

        expect(res.status).toBe(200);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.content.length).toBe(15);
        expect(res.data.data.page).toBe(4);

        done();
      });
    });

    describe('GET /api/user_addresses?uuid=<dynamic-uuid>', () => {
      it('should return user address based on uuid', async done => {
        const { uuid } = addresses[0];
        const res = await axiosInstance.get(`/api/user_addresses?uuid=${uuid}`);

        expect(res.status).toBe(200);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.content.length).toBe(1);
        expect(res.data.data.page).toBe(1);

        expect(res.data.data.content[0]).toHaveProperty('uuid');
        expect(res.data.data.content[0]).toHaveProperty('addressLine1');
        expect(res.data.data.content[0]).toHaveProperty('addressLine2');
        expect(res.data.data.content[0]).toHaveProperty('addressLine3');
        expect(res.data.data.content[0]).toHaveProperty('addressLine4');
        expect(res.data.data.content[0]).toHaveProperty('town');
        expect(res.data.data.content[0]).toHaveProperty('county');
        expect(res.data.data.content[0]).toHaveProperty('country');
        expect(res.data.data.content[0]).toHaveProperty('postCode');
        expect(res.data.data.content[0]).toHaveProperty('typeCode');
        expect(res.data.data.content[0]).toHaveProperty('userUuid');
        expect(res.data.data.content[0]).toHaveProperty('createdAt');
        expect(res.data.data.content[0]).toHaveProperty('updatedAt');
        expect(res.data.data.content[0]).toHaveProperty('status');

        done();
      });
    });

    /* ======================== POST ======================== */

    /* POST /api/user_addresses */
    describe('POST /api/user_addresses', () => {
      it('should add address', async done => {
        const { uuid } = users[0];
        const postData = {
          addressLine1: '100 Smith Mission',
          addressLine2: 'virtual',
          addressLine3: 'holistic',
          addressLine4: 'one-to-one',
          town: 'Rowehaven',
          county: 'Bedfordshire',
          country: 'Austria',
          postCode: '11837',
          typeCode: 1,
          userUuid: uuid,
        };

        const res = await axiosInstance.post('/api/user_addresses', postData);

        expect(res.status).toBe(200);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.addressLine1).toBe(postData.addressLine1);
        expect(res.data.data.addressLine2).toBe(postData.addressLine2);
        expect(res.data.data.addressLine3).toBe(postData.addressLine3);
        expect(res.data.data.addressLine4).toBe(postData.addressLine4);
        expect(res.data.data.town).toBe(postData.town);
        expect(res.data.data.county).toBe(postData.county);
        expect(res.data.data.country).toBe(postData.country);
        expect(res.data.data.postCode).toBe(postData.postCode);
        expect(res.data.data.typeCode).toBe(postData.typeCode);
        expect(res.data.data.userUuid).toBe(postData.userUuid);
        expect(res.data.data).toHaveProperty('createdAt');
        expect(res.data.data).toHaveProperty('updatedAt');
        expect(res.data.data.status).toBe(ACTIVE);

        done();
      });
    });

    /* ======================== PUT ======================== */

    describe('PUT /api/user_addresses', () => {
      it('should update address', async done => {
        const { uuid } = addresses[0];
        const { uuid: userUuid } = users[0];

        const postData = {
          uuid,
          addressLine1: '100 Smith Mission',
          addressLine2: 'virtual',
          addressLine3: 'holistic',
          addressLine4: 'one-to-one',
          town: 'Rowehaven',
          county: 'Bedfordshire',
          country: 'Austria',
          postCode: '11837',
          typeCode: 1,
          userUuid,
        };

        const res = await axiosInstance.put('/api/user_addresses', postData);

        expect(res.status).toBe(200);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.addressLine1).toBe(postData.addressLine1);
        expect(res.data.data.addressLine2).toBe(postData.addressLine2);
        expect(res.data.data.addressLine3).toBe(postData.addressLine3);
        expect(res.data.data.addressLine4).toBe(postData.addressLine4);
        expect(res.data.data.town).toBe(postData.town);
        expect(res.data.data.county).toBe(postData.county);
        expect(res.data.data.country).toBe(postData.country);
        expect(res.data.data.postCode).toBe(postData.postCode);
        expect(res.data.data.typeCode).toBe(postData.typeCode);
        expect(res.data.data.userUuid).toBe(postData.userUuid);
        expect(res.data.data).toHaveProperty('createdAt');
        expect(res.data.data).toHaveProperty('updatedAt');
        expect(res.data.data.status).toBe(ACTIVE);

        done();
      });
    });

    /* ======================== DELETE ======================== */

    describe('DELETE /api/user_addresses', () => {
      it('should permanently remove address from databse', async done => {
        const postData = {
          uuid: addresses[0].uuid,
        };

        const res = await axiosInstance.delete('/api/user_addresses', {
          data: postData,
        });

        expect(res.status).toBe(200);
        expect(res.data.ok).toBe(true);

        expect(res.data.data).toHaveProperty('message');

        done();
      });
    });
  });

  /* COMAPNY ADMIN */
  describe('and a COMAPNY ADMIN is logged in', () => {
    beforeAll(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'company.admin@email.fake',
        password: 'supersecure',
      });
      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    /* ======================== GET ======================== */
    describe('GET /api/user_addresses', () => {
      it('should return addresses', async done => {
        const res = await axiosInstance.get('/api/user_addresses');
        expect(res.status).toBe(200);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.content.length).toBe(15);
        expect(res.data.data.page).toBe(1);
        expect(res.data.data.length).toBe(15);

        done();
      });
    });
  });

  /* COMAPNY REGULAR USER */
  describe('and a COMAPNY REGULAR USER is logged in', () => {
    beforeAll(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'company.regular@email.fake',
        password: 'supersecure',
      });
      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    /* ======================== GET ======================== */

    describe('GET /api/user_addresses', () => {
      it('should NOT return addresses', async done => {
        try {
          await axiosInstance.get('/api/user_addresses');
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
