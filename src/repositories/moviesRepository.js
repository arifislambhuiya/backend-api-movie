import mongoose from "mongoose";
import Movie from "./schema/movieSchema.js";

export const getAllMovies = async () => {
  const movies = await Movie.find()
    .populate("producer", "-_id -role")
    .populate("director", "-_id -role")
    .populate("actors", "-_id -role");

  if (!movies) {
    return null;
  }
  return movies;
};

export const getSingleMoveById = async (movieId) => {
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    console.log("Invalid Object Id");
    return null;
  }
  const movie = await Movie.findById(movieId)
    .populate("producer", "-_id -role")
    .populate("director", "-_id -role")
    .populate("actors", "-_id -role");

  if (!movie) {
    return null;
  }

  return movie;
};

export const createMovieByName = async (movieObj) => {
  const newMovie = new Movie(movieObj);
  await newMovie.save();
  return newMovie;
};

export const updateMovieById = async (movieId, movieObj) => {
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    console.log("Invalid Object Id");
    return null;
  }
  const updatedMovie = await Movie.findByIdAndUpdate(movieId, movieObj, {
    new: true,
  });
  if (!updatedMovie) {
    return null;
  }
  return updatedMovie;
};

export const deleteMovieById = async (movieId) => {
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    console.log("Invalid Object Id");
    return null;
  }
  const deletedMovie = await Movie.findByIdAndDelete(movieId);
  if (!deletedMovie) {
    return false;
  }
  return true;
};
