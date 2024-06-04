/** @jsxImportSource @emotion/react */import React, { useState } from 'react';

import { useGetMoviesQuery } from '../services/api';
import { CircularProgress, Typography, List, ListItem, ListItemText } from '@mui/material';
import { css } from '@emotion/react';
import styled from 'styled-components';

const Container = styled.div`
  display: block;
`;

const MovieForm: React.FC = () => {
  const styles = {
    container: css({
      display: 'block',
    }),
    movieListContainer: css({
      backgroundColor: '#888',
      borderRadius: '50px',
      width: '400px',
      display: 'inline-block',
      justifyContent: 'center',
      textAlign: 'center',
    }),
    movieListWrapper: css({
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
    }),
  };

  const [movieData, setMovieData] = useState<string>('');

  const { data: movies, isLoading: isMoviesLoading, isError: isMoviesError } = useGetMoviesQuery(undefined, {
    skip: false,
  });

  const renderMovies = () => {
    if (isMoviesLoading) return <CircularProgress />;
    if (isMoviesError) return <Typography variant="body1">Ошибка загрузки фильмов.</Typography>;
    if (!movies || !movies.movies || !Array.isArray(movies.movies)) {
      return <Typography variant="body1">Нет данных о фильмах.</Typography>;
    }

    return (
      <Container css={styles.container}>
        <div css={styles.movieListContainer}>
          <Typography variant="h4" gutterBottom>Список фильмов</Typography>
          <div css={styles.movieListWrapper}>
            <List>
              {movies.movies.map((movie: string, index: number) => (
                <ListItem key={index}>
                  <ListItemText primary={movie} />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </Container>
    );
  };

  return (
    <div>
      {renderMovies()}
    </div>
  );
};

export default MovieForm;
