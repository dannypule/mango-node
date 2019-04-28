import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  timeout: 5000
});
const ACTIVE = 'ACTIVE';

describe('Given /api/health_club_addresses', () => {
  describe('when a SUPER ADMIN is logged in', () => {
    beforeAll(async () => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'super.admin@email.fake',
        password: 'supersecure'
      });

      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
    });

    describe('GET', () => {
      describe('GET /api/health_club_addresses', () => {
        it('should return addresses', async () => {
          const res = await axiosInstance.get('/api/health_club_addresses');

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
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
          expect(res.data.data.content[0]).toHaveProperty('healthClubUuid');
          expect(res.data.data.content[0]).toHaveProperty('createdAt');
          expect(res.data.data.content[0]).toHaveProperty('updatedAt');
          expect(res.data.data.content[0]).toHaveProperty('status');
        });
      });

      describe('GET /api/health_club_addresses?page=4', () => {
        it('should return addresses from page 4', async () => {
          const res = await axiosInstance.get('/api/health_club_addresses?page=4');

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(15);
          expect(res.data.data.page).toBe(4);
        });
      });

      describe('GET /api/health_club_addresses?uuid=<dynamic-uuid>', () => {
        let address;

        beforeEach(async () => {
          const addressRes = await axiosInstance.get('/api/health_club_addresses');
          [address] = addressRes.data.data.content;
        });

        it('should return health club address based on uuid', async () => {
          const { uuid } = address;
          const res = await axiosInstance.get(`/api/health_club_addresses?uuid=${uuid}`);

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
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
          expect(res.data.data.content[0]).toHaveProperty('healthClubUuid');
          expect(res.data.data.content[0]).toHaveProperty('createdAt');
          expect(res.data.data.content[0]).toHaveProperty('updatedAt');
          expect(res.data.data.content[0]).toHaveProperty('status');
        });
      });
    });

    describe('POST /api/health_club_addresses', () => {
      let healthClub;

      beforeEach(async () => {
        const healthClubsRes = await axiosInstance.get('/api/health_clubs');
        [healthClub] = healthClubsRes.data.data.content;
      });

      it('should add address', async () => {
        const { uuid } = healthClub;
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
          healthClubUuid: uuid
        };

        const res = await axiosInstance.post('/api/health_club_addresses', postData);

        expect(res.status).toBe(200);
        expect(res.data.message).toBe(undefined);
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
        expect(res.data.data.healthClubUuid).toBe(postData.healthClubUuid);
        expect(res.data.data).toHaveProperty('createdAt');
        expect(res.data.data).toHaveProperty('updatedAt');
        expect(res.data.data.status).toBe(ACTIVE);
      });
    });

    describe('PUT /api/health_club_addresses', () => {
      let address;
      let healthClub;

      beforeEach(async () => {
        const addressRes = await axiosInstance.get('/api/health_club_addresses');
        const healthClubsRes = await axiosInstance.get('/api/health_clubs');
        [address] = addressRes.data.data.content;
        [healthClub] = healthClubsRes.data.data.content;
      });

      it('should update address', async () => {
        const { uuid } = address;
        const { uuid: healthClubUuid } = healthClub;

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
          healthClubUuid
        };

        const res = await axiosInstance.put('/api/health_club_addresses', postData);

        expect(res.status).toBe(200);
        expect(res.data.message).toBe(undefined);
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
        expect(res.data.data.healthClubUuid).toBe(postData.healthClubUuid);
        expect(res.data.data).toHaveProperty('createdAt');
        expect(res.data.data).toHaveProperty('updatedAt');
        expect(res.data.data.status).toBe(ACTIVE);
      });
    });

    describe('DELETE /api/health_club_addresses', () => {
      let address;

      beforeEach(async () => {
        const addressRes = await axiosInstance.get('/api/health_club_addresses');
        [address] = addressRes.data.data.content;
      });

      it('should permanently remove address from databse', async () => {
        const postData = {
          uuid: address.uuid
        };

        const res = await axiosInstance.delete('/api/health_club_addresses', {
          data: postData
        });

        expect(res.status).toBe(200);
        expect(res.data.message).toBe(undefined);
        expect(res.data.ok).toBe(true);

        expect(res.data.data).toHaveProperty('message');
      });
    });
  });

  describe('when a COMPANY ADMIN is logged in', () => {
    beforeAll(async () => {
      try {
        const res = await axiosInstance.post('/api/auth/login', {
          email: 'company.admin@email.fake',
          password: 'supersecure'
        });
        axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      } catch (error) {
        console.error(error);
      }
    });

    describe('GET /api/health_club_addresses', () => {
      it('should return addresses', async () => {
        const res = await axiosInstance.get('/api/health_club_addresses');
        expect(res.status).toBe(200);
        expect(res.data.message).toBe(undefined);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.content.length).toBe(15);
        expect(res.data.data.page).toBe(1);
        expect(res.data.data.length).toBe(15);
      });
    });
  });

  describe('when a COMPANY REGULAR USER is logged in', () => {
    beforeAll(async () => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'company.regular@email.fake',
        password: 'supersecure'
      });
      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
    });

    describe('GET /api/health_club_addresses', () => {
      it('should NOT return addresses', async () => {
        try {
          await axiosInstance.get('/api/health_club_addresses');
        } catch (err) {
          expect(err.response.status).toBe(403);
          expect(err.response.data.ok).toBe(false);
          expect(err.response.data).toHaveProperty('message');
        }
      });
    });
  });
});
