import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

function MovieCard({ id, title, year, poster }) {
  return (
    <Link to={`/movie/${id}`} className="movie-card">
      <img src={poster} alt={title} className="movie-poster" />
      <div className="movie-info">
        <h3>{title}</h3>
        <p>{year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;

