import {
  createParticipantByName,
  deleteParticipantById,
  getAllParticipants,
  getSingleParticipantById,
  updataParticipantById,
} from "../repositories/participantRepository.js";

import {
  getDataFromRedis,
  invalidKey,
  setDataToRedis,
} from "../lib/redisHelper.js";

const REDIS_KEY = "participants";
const REDIS_CACHE = 3600;

export const createParticipant = async (req, res) => {
  const { name, age, role } = req.body;
  const result = await createParticipantByName(name, age, role);
  await invalidKey(REDIS_KEY);
  res.status(201).json(result);
};

export const getParticipants = async (req, res) => {
  const resultFromRedis = await getDataFromRedis(REDIS_KEY);
  if (resultFromRedis) {
    console.log("Getting Data from Redis", REDIS_KEY);

    res.status(200).json(resultFromRedis);
    return;
  }

  const result = await getAllParticipants();
  console.log("Getting data from Database");

  await setDataToRedis(REDIS_KEY, result, REDIS_CACHE);
  res.status(200).json(result);
};

export const getSingleParticipant = async (req, res) => {
  const id = req?.params?.id ?? "";

  const resultFromRedis = await getDataFromRedis(REDIS_KEY);
  if (resultFromRedis) {
    console.log("Getting Data from Redis", REDIS_KEY);
    const getDatafromRedisById = resultFromRedis?.find(
      (result) => result._id === id
    );
    res.status(200).json(getDatafromRedisById);
    return;
  }

  const result = await getSingleParticipantById(id);
  console.log("Data found from Database");
  if (!result) {
    res.status(404).json({ massage: "Participant Not Found" });
    return;
  }
  res.status(200).json(result);
};

export const updateParticipant = async (req, res) => {
  const { id } = req.params;
  const { name, age, role } = req.body;

  const result = await updataParticipantById(id, name, age, role);
  if (!result) {
    res.status(404).json({ massage: "Participant Not Found" });
    return;
  }
  await invalidKey(REDIS_KEY);
  res.status(200).json(result);
};

export const deleteParticipant = async (req, res) => {
  const { id } = req.params;

  const result = await deleteParticipantById(id);
  if (!result) {
    res.status(404).json({ massage: "Participant Not Found" });
    return;
  }
  await invalidKey(REDIS_KEY);

  res.status(204).json({
    message: "Participant Deleted Successfully",
  });
};
