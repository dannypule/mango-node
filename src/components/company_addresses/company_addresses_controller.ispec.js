import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: `${config.baseURL}`,
  timeout: 5000,
});
const ACTIVE = 'ACTIVE';

describe('Given /api/company_addresses', () => {
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
      describe('GET /api/company_addresses', () => {
        it('should return addresses', async done => {
          const res = await axiosInstance.get('/api/company_addresses');

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
          expect(res.data.data.content[0]).toHaveProperty('companyUuid');
          expect(res.data.data.content[0]).toHaveProperty('createdAt');
          expect(res.data.data.content[0]).toHaveProperty('updatedAt');
          expect(res.data.data.content[0]).toHaveProperty('status');

          done();
        });
      });

      describe('GET /api/company_addresses?page=4', () => {
        it('should return addresses from page 4', async done => {
          const res = await axiosInstance.get('/api/company_addresses?page=4');

          expect(res.status).toBe(200);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(15);
          expect(res.data.data.page).toBe(4);

          done();
        });
      });

      describe('GET /api/company_addresses?uuid=<dynamic-uuid>', () => {
        let address;

        beforeEach(async done => {
          const addressRes = await axiosInstance.get('/api/company_addresses');
          [address] = addressRes.data.data.content;
          done();
        });

        it('should return company address based on uuid', async done => {
          const { uuid } = address;
          const res = await axiosInstance.get(`/api/company_addresses?uuid=${uuid}`);

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
          expect(res.data.data.content[0]).toHaveProperty('companyUuid');
          expect(res.data.data.content[0]).toHaveProperty('createdAt');
          expect(res.data.data.content[0]).toHaveProperty('updatedAt');
          expect(res.data.data.content[0]).toHaveProperty('status');

          done();
        });
      });
    });

    describe('POST /api/company_addresses', () => {
      let company;

      beforeEach(async done => {
        const companiesRes = await axiosInstance.get('/api/companies');
        [company] = companiesRes.data.data.content;
        done();
      });

      it('should add address', async done => {
        const { uuid } = company;
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
          companyUuid: uuid,
        };

        const res = await axiosInstance.post('/api/company_addresses', postData);

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
        expect(res.data.data.companyUuid).toBe(postData.companyUuid);
        expect(res.data.data).toHaveProperty('createdAt');
        expect(res.data.data).toHaveProperty('updatedAt');
        expect(res.data.data.status).toBe(ACTIVE);

        done();
      });
    });

    describe('PUT /api/company_addresses', () => {
      let address;
      let company;

      beforeEach(async done => {
        const addressRes = await axiosInstance.get('/api/company_addresses');
        const companiesRes = await axiosInstance.get('/api/companies');
        [address] = addressRes.data.data.content;
        [company] = companiesRes.data.data.content;
        done();
      });

      it('should update address', async done => {
        const { uuid } = address;
        const { uuid: companyUuid } = company;

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
          companyUuid,
        };

        const res = await axiosInstance.put('/api/company_addresses', postData);

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
        expect(res.data.data.companyUuid).toBe(postData.companyUuid);
        expect(res.data.data).toHaveProperty('createdAt');
        expect(res.data.data).toHaveProperty('updatedAt');
        expect(res.data.data.status).toBe(ACTIVE);

        done();
      });
    });

    describe('DELETE /api/company_addresses', () => {
      let address;

      beforeEach(async done => {
        const addressRes = await axiosInstance.get('/api/company_addresses');
        [address] = addressRes.data.data.content;
        done();
      });

      it('should permanently remove address from databse', async done => {
        const postData = {
          uuid: address.uuid,
        };

        const res = await axiosInstance.delete('/api/company_addresses', {
          data: postData,
        });

        expect(res.status).toBe(200);
        expect(res.data.ok).toBe(true);

        expect(res.data.data).toHaveProperty('message');

        done();
      });
    });
  });

  describe('when a COMPANY ADMIN is logged in', () => {
    beforeAll(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'company.admin@email.fake',
        password: 'supersecure',
      });
      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    describe('GET /api/company_addresses', () => {
      it('should return addresses', async done => {
        const res = await axiosInstance.get('/api/company_addresses');
        expect(res.status).toBe(200);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.content.length).toBe(15);
        expect(res.data.data.page).toBe(1);
        expect(res.data.data.length).toBe(15);

        done();
      });
    });
  });

  describe('when a COMPANY REGULAR USER is logged in', () => {
    beforeAll(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'company.regular@email.fake',
        password: 'supersecure',
      });
      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    describe('GET /api/company_addresses', () => {
      it('should NOT return addresses', async done => {
        try {
          await axiosInstance.get('/api/company_addresses');
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
