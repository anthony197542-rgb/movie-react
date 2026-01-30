import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import './Home.css';

function Home() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialQuery = searchParams.get("search") || "";
  const [query, setQuery] = useState(initialQuery);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'c9f7240a';

  const searchMovies = async (term) => {
    const q = term || query;
    if (!q.trim()) return;

    setLoading(true);

    // Push a new history entry so the back button works
    navigate(`/?search=${q}`);

    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${q}`);
      const data = await res.json();

      if (data.Search) {
        setMovies(data.Search.slice(0, 6));
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error("API error:", err);
      setMovies([]);
    }

    setLoading(false);
  };

  // Auto-run search when URL already has ?search=...
  useEffect(() => {
    if (initialQuery) {
      searchMovies(initialQuery);
    }
  }, []);

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
        <button onClick={() => searchMovies()}>Search</button>
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
