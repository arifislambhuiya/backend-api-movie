import {
  createMovieByName,
  deleteMovieById,
  getAllMovies,
  getSingleMoveById,
  updateMovieById,
} from "../repositories/moviesRepository.js";

import {
  getDataFromRedis,
  invalidKey,
  setDataToRedis,
} from "../lib/redisHelper.js";

const REDIS_KEY = "movies";
const REDIS_CACHE = 3600;

export const getMovies = async (req, res) => {
  const resultFromRedis = await getDataFromRedis(REDIS_KEY);
  if (resultFromRedis) {
    console.log("Found data from redis"), res.status(200).json(resultFromRedis);
    return;
  }
  const movies = await getAllMovies();
  console.log("Found Data from Database");
  await setDataToRedis(REDIS_KEY, movies, REDIS_CACHE);
  res.status(200).json(movies);
};

export const getSingleMoive = async (req, res) => {
  const { id } = req.params;
  const resultFromRedis = await getDataFromRedis(REDIS_KEY);
  if (resultFromRedis) {
    console.log("Found data from redis");
    const result = resultFromRedis.find((movie) => movie._id === id);
    res.status(200).json(result);
    return;
  }

  const movie = await getSingleMoveById(id);
  console.log("Found Data from Database");
  if (!movie) {
    res.status(404).json({ message: "Data Not Found" });
  }
  res.status(200).json(movie);
};

export const createMovie = async (req, res) => {
  const movieObj = req?.body ?? {};
  const movie = await createMovieByName(movieObj);
  await invalidKey(REDIS_KEY);
  res.status(201).json(movie);
};

export const updateMovie = async (req, res) => {
  const id = req?.params?.id ?? 0;
  const movieObj = req?.body ?? {};
  const updatedMovie = await updateMovieById(id, movieObj);

  if (!updatedMovie) {
    res.status(404).json({ message: "Movie Not Found" });
    return;
  }

  await invalidKey(REDIS_KEY);
  res.status(200).json(updatedMovie);
};

export const deleteMovie = async (req, res) => {
  const id = req?.params?.id ?? 0;
  const deletedMovie = await deleteMovieById(id);
  if (!deletedMovie) {
    res.status(404).json({ message: "movie not found" });
    return;
  }
  await invalidKey(REDIS_KEY);
  res.status(204).json(deletedMovie);
};


