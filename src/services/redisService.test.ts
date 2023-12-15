import { RedisService } from './redisService';
import redisMock from 'redis-mock';

jest.mock('redis', () => redisMock);

describe('RedisService', () => {
  let redisService: RedisService;

  beforeEach(() => {
    redisService = new RedisService();
  });

  it('should set a value', (done) => {
    redisService.set('key', 'value', (err, reply) => {
      expect(err).toBeNull();
      expect(reply).toBe('OK');
      done();
    });
  });

  it('should get a value', (done) => {
    redisService.set('key', 'value', (err, reply) => {
      redisService.get('key', (err, reply) => {
        expect(err).toBeNull();
        expect(reply).toBe('value');
        done();
      });
    });
  });

  it('should delete a value', (done) => {
    redisService.set('key', 'value', (err, reply) => {
      redisService.del('key', (err, reply) => {
        expect(err).toBeNull();
        expect(reply).toBe(1);
        done();
      });
    });
  });
});