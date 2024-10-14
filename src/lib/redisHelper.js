import redisClient from "../config/redis.js";

export const getDataFromRedis = async (key) => {
  const cacheData = await redisClient.get(key);
  return JSON.parse(cacheData);
};

export const setDataToRedis = async (key, data, cacheDuration) => {
  await redisClient.setex(key, cacheDuration, JSON.stringify(data));
  return true;
};

export const invalidKey = async (key) => {
  await redisClient.del(key);
};
