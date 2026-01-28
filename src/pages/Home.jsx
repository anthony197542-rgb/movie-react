import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';
import './Home.css';

function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'c9f7240a';

  const searchMovies = async () => {
    if (!query.trim()) return;

    setLoading(true);

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;

    const res = await fetch(url);
    const data = await res.json();

    setLoading(false);

    if (data.Search) {
      setMovies(data.Search.slice(0, 6));
    } else {
      setMovies([]);
    }
  };

  return (
    <div className="home-container">
      <h2 className="home-title">Movie Search</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      <div className="movie-grid">
        {loading &&
          [...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-card"></div>
          ))
        }

        {!loading &&
          movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              id={movie.imdbID}
              title={movie.Title}
              year={movie.Year}
              poster={movie.Poster}
            />
          ))
        }
      </div>
    </div>
  );
}

export default Home;

