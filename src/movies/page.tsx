'use client';

import React, { useEffect, useState } from 'react';
import { pb } from '../lib/pocketbase';

interface Movie {
  id: string;
  title: string;
  rating: number;
}

function Movies() {
  const [movies, setMovies] = useState<any>([]);
  const [name, setName] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const records = pb
      .collection('movies')
      .getFullList({
        sort: '-created',
      })
      .then((item: any) => {
        setMovies(item);
      });
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = { title: name, rating: rating };

    console.log(event);

    try {
      const record = await pb.collection('movies').create(data);
      setMovies([...movies, record]);
    } catch (error) {
      console.error('Failed to add movie:', error);
    }
  };

  return (
    <div>
      <ul>
        {movies?.map((movie: Movie) => (
          <li key={movie.id}>
            {movie.title}, {movie.rating}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '44px' }}>
        <label htmlFor="name">
          <input
            id="name"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="rating">
          <input
            id="rating"
            style={{ marginLeft: '8px' }}
            placeholder="rating"
            onChange={(e) => setRating(Number(e.target.value))}
          ></input>
        </label>
        <button
          onClick={handleSubmit}
          style={{ marginLeft: '8px', padding: '0 8px' }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Movies;
