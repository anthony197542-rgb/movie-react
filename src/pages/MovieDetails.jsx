import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'c9f7240a';

  useEffect(() => {
    const fetchMovie = async () => {
      const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`;
      const res = await fetch(url);
      const data = await res.json();
      setMovie(data);
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="details-container">
        <div className="details-skeleton"></div>
      </div>
    );
  }

  return (
    <div className="details-container">
      <img className="details-poster" src={movie.Poster} alt={movie.Title} />

      <div className="details-info">
        <h1>{movie.Title}</h1>
        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Rated:</strong> {movie.Rated}</p>
        <p><strong>Runtime:</strong> {movie.Runtime}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>

        <h3>Plot</h3>
        <p>{movie.Plot}</p>
      </div>
    </div>
  );
}

export default MovieDetails;
