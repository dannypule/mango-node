import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  timeout: 5000
});
const ACTIVE = 'ACTIVE';

describe('Given /api/health_club_phone_numbers', () => {
  describe('when a SUPER ADMIN is logged in', () => {
    beforeAll(async () => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'super.admin@email.fake',
        password: 'supersecure'
      });
      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
    });

    describe('GET', () => {
      describe('GET /api/health_club_phone_numbers', () => {
        it('should return phoneNumbers', async () => {
          const res = await axiosInstance.get('/api/health_club_phone_numbers');

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
          expect(res.data.data.content[0]).toHaveProperty('phone');
          expect(res.data.data.content[0]).toHaveProperty('typeCode');
          expect(res.data.data.content[0]).toHaveProperty('healthClubUuid');
          expect(res.data.data.content[0]).toHaveProperty('createdAt');
          expect(res.data.data.content[0]).toHaveProperty('updatedAt');
          expect(res.data.data.content[0]).toHaveProperty('status');
        });
      });

      describe('GET /api/health_club_phone_numbers?page=4', () => {
        it('should return phone numbers from page 4', async () => {
          const res = await axiosInstance.get('/api/health_club_phone_numbers?page=4');

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(15);
          expect(res.data.data.page).toBe(4);
        });
      });

      describe('GET /api/health_club_phone_numbers?uuid=<dynamic-uuid>', () => {
        let phoneNumber;

        beforeEach(async () => {
          const phoneNumberRes = await axiosInstance.get('/api/health_club_phone_numbers');
          [phoneNumber] = phoneNumberRes.data.data.content;
        });

        it('should return health club phone number based on uuid', async () => {
          const { uuid } = phoneNumber;
          const res = await axiosInstance.get(`/api/health_club_phone_numbers?uuid=${uuid}`);

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(1);
          expect(res.data.data.page).toBe(1);

          expect(res.data.data.content[0]).toHaveProperty('uuid');
          expect(res.data.data.content[0]).toHaveProperty('phone');
          expect(res.data.data.content[0]).toHaveProperty('typeCode');
          expect(res.data.data.content[0]).toHaveProperty('healthClubUuid');
          expect(res.data.data.content[0]).toHaveProperty('createdAt');
          expect(res.data.data.content[0]).toHaveProperty('updatedAt');
          expect(res.data.data.content[0]).toHaveProperty('status');
        });
      });
    });

    describe('POST /api/health_club_phone_numbers', () => {
      let healthClub;

      beforeEach(async () => {
        const healthClubsRes = await axiosInstance.get('/api/health_clubs');
        [healthClub] = healthClubsRes.data.data.content;
      });

      it('should add phoneNumber', async () => {
        const { uuid } = healthClub;
        const postData = {
          phone: '840.649.2349',
          typeCode: 1,
          healthClubUuid: uuid,
          status: 'ACTIVE'
        };

        const res = await axiosInstance.post('/api/health_club_phone_numbers', postData);

        expect(res.status).toBe(200);
        expect(res.data.message).toBe(undefined);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.phone).toBe(postData.phone);
        expect(res.data.data.typeCode).toBe(postData.typeCode);
        expect(res.data.data.healthClubUuid).toBe(postData.healthClubUuid);
        expect(res.data.data).toHaveProperty('createdAt');
        expect(res.data.data).toHaveProperty('updatedAt');
        expect(res.data.data.status).toBe(ACTIVE);
      });
    });

    describe('PUT /api/health_club_phone_numbers', () => {
      let phoneNumber;
      let healthClub;

      beforeEach(async () => {
        const phoneNumbersRes = await axiosInstance.get('/api/health_club_phone_numbers');
        [phoneNumber] = phoneNumbersRes.data.data.content;
        const healthClubsRes = await axiosInstance.get('/api/health_clubs');
        [healthClub] = healthClubsRes.data.data.content;
      });

      it('should update phoneNumber', async () => {
        const { uuid } = phoneNumber;
        const { uuid: healthClubUuid } = healthClub;

        const postData = {
          uuid,
          phone: '555.777.9999',
          typeCode: 1,
          healthClubUuid
        };

        const res = await axiosInstance.put('/api/health_club_phone_numbers', postData);

        expect(res.status).toBe(200);
        expect(res.data.message).toBe(undefined);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.uuid).toBe(postData.uuid);
        expect(res.data.data.phone).toBe(postData.phone);
        expect(res.data.data.typeCode).toBe(postData.typeCode);
        expect(res.data.data.healthClubUuid).toBe(postData.healthClubUuid);
        expect(res.data.data).toHaveProperty('createdAt');
        expect(res.data.data).toHaveProperty('updatedAt');
        expect(res.data.data.status).toBe(ACTIVE);
      });
    });

    describe('DELETE /api/health_club_phone_numbers', () => {
      let phoneNumber;

      beforeEach(async () => {
        const phoneNumberRes = await axiosInstance.get('/api/health_club_phone_numbers');
        [phoneNumber] = phoneNumberRes.data.data.content;
      });

      it('should permanently remove phoneNumber from databse', async () => {
        const postData = {
          uuid: phoneNumber.uuid
        };

        const res = await axiosInstance.delete('/api/health_club_phone_numbers', {
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
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'company.admin@email.fake',
        password: 'supersecure'
      });
      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
    });

    describe('GET /api/health_club_phone_numbers', () => {
      it('should return phoneNumbers', async () => {
        const res = await axiosInstance.get('/api/health_club_phone_numbers');
        expect(res.status).toBe(200);
        expect(res.data.message).toBe(undefined);
        expect(res.data.ok).toBe(true);

        expect(res.data.data.content.length).toBe(15);
        expect(res.data.data.page).toBe(1);
        expect(res.data.data.length).toBe(15);

        expect(res.data.data.content[0]).toHaveProperty('uuid');
        expect(res.data.data.content[0]).toHaveProperty('phone');
        expect(res.data.data.content[0]).toHaveProperty('typeCode');
        expect(res.data.data.content[0]).toHaveProperty('healthClubUuid');
        expect(res.data.data.content[0]).toHaveProperty('createdAt');
        expect(res.data.data.content[0]).toHaveProperty('updatedAt');
        expect(res.data.data.content[0]).toHaveProperty('status');
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

    describe('GET /api/health_club_phone_numbers', () => {
      it('should NOT return phoneNumbers', async () => {
        try {
          await axiosInstance.get('/api/health_club_phone_numbers');
        } catch (err) {
          expect(err.response.status).toBe(403);
          expect(err.response.data.ok).toBe(false);
          expect(err.response.data).toHaveProperty('message');
        } finally {
        }
      });
    });
  });
});
