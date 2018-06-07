// import {} from 'jest'
import supertest from 'supertest';

const request = supertest('http://localhost:5566');

describe('GET /api', () => {
  it('should return 200 OK', done => {
    request.get('/').expect(200, (err, res) => {
      // console.log(res.body)
      expect(res.body.data).toBe('PONG');
      done();
    });
  });
});
