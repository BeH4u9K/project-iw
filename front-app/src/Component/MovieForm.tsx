import { css } from '@emotion/css';
import React, { useState, ChangeEvent } from 'react';
import { useMoviesQuery } from '../services/api';
import { CircularProgress, Typography, List, ListItem, ListItemText } from '@mui/material';

const MovieForm: React.FC = () => {
  const [movieData, setMovieData] = useState<string>('');

  const { data: movies, isLoading: isMoviesLoading, isError: isMoviesError } = useMoviesQuery(undefined, {
    skip: false, 
  });

  const renderMovies = () => {
    if (isMoviesLoading) return <CircularProgress />;
    if (isMoviesError) return <Typography variant="body1">Ошибка загрузки фильмов.</Typography>;
    if (!movies || !movies.movies || !Array.isArray(movies.movies)) {
      return <Typography variant="body1">Нет данных о фильмах.</Typography>;
    }

    return (
      <div className={css`display: block;`}>
        <div className={css`
          background-color: #888;
          border-radius: 50px;
          width: 400px;
          display: inline-block;
          justify-content: center;
          text-align: center;
        `}>
          <Typography variant="h4" gutterBottom>Список фильмов</Typography>
          <div className={css`
            display: flex;
            justify-content: center;
            text-align: center;
          `}>
            <List>
              {movies.movies.map((movie: string, index: number) => (
                <ListItem key={index}>
                  <ListItemText primary={movie} />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderMovies()}
    </div>
  );
};

export default MovieForm;
