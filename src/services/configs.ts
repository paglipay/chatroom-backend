import { Redis } from "ioredis";

export class RedisConfig {
    private redis: Redis;
    constructor() {
        console.log("RedisConfig constructor");
        this.redis = new Redis({
            host: "localhost",
            port: 6379,
            // password: "yourpassword",
        });
    }

    public async consume(channel: string, callback: (message: string) => Promise<void>) {
        await this.redis.subscribe(channel);
        this.redis.on("message", async (ch, message) => {
            if (channel === ch) {
                await callback(message);
            }
        });
    }

    public async produce(channel: string, message: string) {
        await this.redis.publish(channel, message);
    }
}

