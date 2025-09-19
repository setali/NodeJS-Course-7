import { RedisStore } from "connect-redis";
import { createClient } from "redis";

// Initialize client.
export const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.connect().catch(console.error);

// Initialize store.
export const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});
