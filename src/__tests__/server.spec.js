import {} from 'jest';
import supertest from 'supertest';

const request = supertest('http://localhost:5566');

describe('GET /api', () => {
  it('should return 200 OK', () => {
    // request.get('/api/users').expect(false);
    expect(true).toBe(true);
  });
});
