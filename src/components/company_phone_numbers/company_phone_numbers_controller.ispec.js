import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: `${config.baseURL}`,
  timeout: 5000,
});
const ACTIVE = 'ACTIVE';

describe('Given /api/company_phone_numbers', () => {
  describe('and a SUPER ADMIN is logged in', () => {
    beforeAll(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'super.admin@email.fake',
        password: 'supersecure',
      });
      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    describe('GET', () => {
      describe('GET /api/company_phone_numbers', () => {
        it('should return phoneNumbers', async done => {
          const res = await axiosInstance.get('/api/company_phone_numbers');

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(15);
          expect(res.data.data.page).toBe(1);

          expect(res.data.data.content).not.toBe(0);

          expect(res.data.data).toHaveProperty('count');
          expect(res.data.data).toHaveProperty('pages');
          expect(res.data.data).toHaveProperty('page');

          expect(res.data.data.content[0]).toHaveProperty('uuid');
          expect(res.data.data.content[0]).toHaveProperty('phone');
          expect(res.data.data.content[0]).toHaveProperty('typeCode');
          expect(res.data.data.content[0]).toHaveProperty('companyUuid');
          expect(res.data.data.content[0]).toHaveProperty('createdAt');
          expect(res.data.data.content[0]).toHaveProperty('updatedAt');
          expect(res.data.data.content[0]).toHaveProperty('status');

          done();
        });
      });

      describe('GET /api/company_phone_numbers?page=4', () => {
        it('should return phone numbers from page 4', async done => {
          const res = await axiosInstance.get('/api/company_phone_numbers?page=4');

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(15);
          expect(res.data.data.page).toBe(4);

          done();
        });
      });

      describe('GET /api/company_phone_numbers?uuid=<dynamic-uuid>', () => {
        let phoneNumber;

        beforeEach(async done => {
          const phoneNumberRes = await axiosInstance.get('/api/company_phone_numbers');
          [phoneNumber] = phoneNumberRes.data.data.content;
          done();
        });

        it('should return company phone number based on uuid', async done => {
          const { uuid } = phoneNumber;
          const res = await axiosInstance.get(`/api/company_phone_numbers?uuid=${uuid}`);

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(1);
          expect(res.data.data.page).toBe(1);

          expect(res.data.data.content[0]).toHaveProperty('uuid');
          expect(res.data.data.content[0]).toHaveProperty('phone');
          expect(res.data.data.content[0]).toHaveProperty('typeCode');
          expect(res.data.data.content[0]).toHaveProperty('companyUuid');
          expect(res.data.data.content[0]).toHaveProperty('createdAt');
          expect(res.data.data.content[0]).toHaveProperty('updatedAt');
          expect(res.data.data.content[0]).toHaveProperty('status');

          done();
        });
      });
    });

    describe('POST /api/company_phone_numbers', () => {
      let company;

      beforeEach(async done => {
        const companiesRes = await axiosInstance.get('/api/companies');
        [company] = companiesRes.data.data.content;
        done();
      });

      it('should add phoneNumber', async done => {
        const { uuid } = company;
        const postData = {
          phone: '840.649.2349',
          typeCode: 1,
          companyUuid: uuid,
        };

        const res = await axiosInstance.post('/api/company_phone_numbers', postData);

        expect(res.status).toBe(200);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.phone).toBe(postData.phone);
        expect(res.data.data.typeCode).toBe(postData.typeCode);
        expect(res.data.data.companyUuid).toBe(postData.companyUuid);
        expect(res.data.data).toHaveProperty('createdAt');
        expect(res.data.data).toHaveProperty('updatedAt');
        expect(res.data.data.status).toBe(ACTIVE);

        done();
      });
    });

    describe('PUT /api/company_phone_numbers', () => {
      let phoneNumber;
      let company;

      beforeEach(async done => {
        const phoneNumbersRes = await axiosInstance.get('/api/company_phone_numbers');
        [phoneNumber] = phoneNumbersRes.data.data.content;
        const companiesRes = await axiosInstance.get('/api/companies');
        [company] = companiesRes.data.data.content;
        done();
      });

      it('should update phoneNumber', async done => {
        const { uuid } = phoneNumber;
        const { uuid: companyUuid } = company;

        const postData = {
          uuid,
          phone: '555.777.9999',
          typeCode: 1,
          companyUuid,
        };

        const res = await axiosInstance.put('/api/company_phone_numbers', postData);

        expect(res.status).toBe(200);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.uuid).toBe(postData.uuid);
        expect(res.data.data.phone).toBe(postData.phone);
        expect(res.data.data.typeCode).toBe(postData.typeCode);
        expect(res.data.data.companyUuid).toBe(postData.companyUuid);
        expect(res.data.data).toHaveProperty('createdAt');
        expect(res.data.data).toHaveProperty('updatedAt');
        expect(res.data.data.status).toBe(ACTIVE);

        done();
      });
    });

    describe('DELETE /api/company_phone_numbers', () => {
      let phoneNumber;

      beforeEach(async done => {
        const phoneNumberRes = await axiosInstance.get('/api/company_phone_numbers');
        [phoneNumber] = phoneNumberRes.data.data.content;
        done();
      });

      it('should permanently remove phoneNumber from databse', async done => {
        const postData = {
          uuid: phoneNumber.uuid,
        };

        const res = await axiosInstance.delete('/api/company_phone_numbers', {
          data: postData,
        });

        expect(res.status).toBe(200);
        expect(res.data.ok).toBe(true);

        expect(res.data.data).toHaveProperty('message');

        done();
      });
    });
  });

  describe('and a COMPANY ADMIN is logged in', () => {
    beforeAll(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'company.admin@email.fake',
        password: 'supersecure',
      });
      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    describe('GET /api/company_phone_numbers', () => {
      it('should return phoneNumbers', async done => {
        const res = await axiosInstance.get('/api/company_phone_numbers');
        expect(res.status).toBe(200);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.content.length).toBe(15);
        expect(res.data.data.page).toBe(1);
        expect(res.data.data.length).toBe(15);

        expect(res.data.data.content[0]).toHaveProperty('uuid');
        expect(res.data.data.content[0]).toHaveProperty('phone');
        expect(res.data.data.content[0]).toHaveProperty('typeCode');
        expect(res.data.data.content[0]).toHaveProperty('companyUuid');
        expect(res.data.data.content[0]).toHaveProperty('createdAt');
        expect(res.data.data.content[0]).toHaveProperty('updatedAt');
        expect(res.data.data.content[0]).toHaveProperty('status');

        done();
      });
    });
  });

  describe('and a COMPANY REGULAR USER is logged in', () => {
    beforeAll(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'company.regular@email.fake',
        password: 'supersecure',
      });
      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    describe('GET /api/company_phone_numbers', () => {
      it('should NOT return phoneNumbers', async done => {
        try {
          await axiosInstance.get('/api/company_phone_numbers');
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
