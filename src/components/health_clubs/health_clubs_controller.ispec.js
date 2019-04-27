import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  timeout: 5000
});
const ACTIVE = 'ACTIVE';

describe('Given /api/health_clubs', () => {
  describe('when a SUPER ADMIN is logged in', () => {
    beforeAll(async done => {
      const res = await axiosInstance.post('/api/auth/login', {
        email: 'super.admin@email.fake',
        password: 'supersecure'
      });

      axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
      done();
    });

    describe('GET', () => {
      describe('GET /api/health_clubs', () => {
        it('should return health clubs', async () => {
          const res = await axiosInstance.get('/api/health_clubs');

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(15);
          expect(res.data.data.page).toBe(1);
          expect(res.data.data.length).toBe(15);

          expect(res.data.data.content[0]).toHaveProperty('uuid');
          expect(res.data.data.content[0]).toHaveProperty('name');
          expect(res.data.data.content[0]).toHaveProperty('createdAt');
          expect(res.data.data.content[0]).toHaveProperty('updatedAt');
          expect(res.data.data.content[0]).toHaveProperty('status');
        });
      });

      describe('GET /api/health_clubs?page=4', () => {
        it('should return health clubs from page 4', async () => {
          const res = await axiosInstance.get('/api/health_clubs?page=4');

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(15);
          expect(res.data.data.page).toBe(4);
          expect(res.data.data.length).toBe(15);
        });
      });

      describe('GET /api/health_clubs?uuid=:uuid', () => {
        let healthClub;
        beforeEach(async () => {
          const res = await axiosInstance.get('/api/health_clubs');
          [healthClub] = res.data.data.content;
        });

        it('should return health club with uuid', async () => {
          const res = await axiosInstance.get(`/api/health_clubs?uuid=${healthClub.uuid}`);

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.content.length).toBe(1);
          expect(res.data.data.page).toBe(1);
          expect(res.data.data.length).toBe(1);
        });
      });
    });

    describe('POST', () => {
      describe('POST /api/health_clubs', () => {
        it('should add health club', async () => {
          const postData = {
            name: 'Super Health Club',
            timezone: 'yay',
            dateFormat: 'hey',
            timeFormat: 'ho',
            firstDayOfTheWeek: 'MON'
          };
          const res = await axiosInstance.post('/api/health_clubs', postData);

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);

          expect(res.data.data).toHaveProperty('uuid');
          expect(res.data.data.name).toBe(postData.name);
          expect(res.data.data).toHaveProperty('createdAt');
          expect(res.data.data).toHaveProperty('updatedAt');
          expect(res.data.data).toHaveProperty('status');
          expect(res.data.data.status).toBe(ACTIVE);
        });
      });
    });

    describe('PUT', () => {
      let healthClub;
      beforeEach(async () => {
        const res = await axiosInstance.get('/api/health_clubs');
        [healthClub] = res.data.data.content;
      });

      describe('PUT /api/health_clubs', () => {
        it('should update user', async done => {
          const postData = {
            uuid: healthClub.uuid,
            name: 'Super Health Club Pro',
            timezone: 'yayy',
            dateFormat: 'heyy',
            timeFormat: 'hooo',
            firstDayOfTheWeek: 'SUN',
            status: 'DELETED'
          };
          const res = await axiosInstance.put('/api/health_clubs', postData);

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);

          expect(res.data.data.uuid).toBe(postData.uuid);
          expect(res.data.data.name).toBe(postData.name);
          expect(res.data.data.status).toBe(postData.status);

          done();
        });
      });
    });

    describe('DELETE', () => {
      let healthClub;
      beforeEach(async () => {
        const res = await axiosInstance.get('/api/health_clubs');
        [healthClub] = res.data.data.content;
      });

      describe('DELETE /api/health_clubs', () => {
        it('should permanently remove health clubs from database', async () => {
          const postData = {
            uuid: healthClub.uuid
          };
          const res = await axiosInstance.delete('/api/health_clubs', {
            data: postData
          });

          expect(res.status).toBe(200);
          expect(res.data.message).toBe(undefined);
          expect(res.data.ok).toBe(true);
          expect(res.data.data).toHaveProperty('message');
        });
      });
    });
  });
});
