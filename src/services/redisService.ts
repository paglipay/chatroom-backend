import redis from 'redis';

export class RedisService {
  private client: redis.RedisClient;

  constructor() {
    console.log('RedisService constructor');
    this.client = redis.createClient({
      host: 'localhost',
      port: 6379
    });

    this.client.on('error', (error) => {
      console.error(`Redis error: ${error}`);
    });
  }

  public set(key: string, value: string, callback?: redis.Callback<'OK'>): void {
    this.client.set(key, value, callback);
  }

  public get(key: string, callback: redis.Callback<string | null>): void {
    this.client.get(key, callback);
  }

  public lrange(key: string, start: number, stop: number, callback: (err: Error | null, reply: string[]) => void): void {
    this.client.lrange(key, start, stop, callback);
  }

  public del(key: string, callback?: redis.Callback<number>): void {
    this.client.del(key, callback);
  }

  public publish(key: string, value: string, callback?: redis.Callback<number>): void {
    this.client.publish(key, value, callback);
  }
}