import { Redis } from "ioredis";

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.on("error", (error) => {
  console.log(`Redis error`, error?.message);
});

export default redisClient;

