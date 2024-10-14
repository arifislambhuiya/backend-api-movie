import mongoose from "mongoose";
import { MOVIE_GENRE } from "../../constant.js";

const movieSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
    },
    movieDuration: {
      type: Number,
      required: true,
      min: 1,
    },
    movieRating: {
      type: Number,
      required: true,
      min: 0.0,
      max: 10.0,
    },
    genre: {
      type: String,
      retuired: true,
      enum: MOVIE_GENRE,
    },
    producer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participant",
    },
    director: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participant",
    },
    actors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
      },
    ],
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
