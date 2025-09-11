import { RedisStore } from "connect-redis";
import { createClient } from "redis";

// Initialize client.
const redisClient = createClient({
  url: "redis://localhost:6377",
});
redisClient.connect().catch(console.error);

// Initialize store.
export const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});
