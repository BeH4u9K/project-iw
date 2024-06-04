/** @jsxImportSource @emotion/react */
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, CircularProgress, Typography } from '@mui/material';
import { css } from '@emotion/react';
import { useAddMovieMutation, useDeleteMovieMutation } from '../services/api';
import '../ComponentCss/LoginForm.css';

interface IAddFormInput {
  movieData: string;
}

interface IDeleteFormInput {
  movieData: string;
}

const AdminForm: React.FC = () => {
  const styles = {
    container: css({
      backgroundColor: '#888',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '400px',
      width: '305px',
      borderRadius: '50px',
    }),
    form: css({
      width: '100%',
    }),
    formControl: css({
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
    }),
    firstInput: css({
      marginBottom: '20px',
    }),
    roundedInput: css({
      width: '278px',
      '& .MuiOutlinedInput-root': {
        borderRadius: '50px',
      },
      '& input:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 30px rgb(136, 136, 136) inset !important',
        WebkitTextFillColor: 'black !important',
      },
      '& .MuiOutlinedInput-root:-webkit-autofill, .MuiOutlinedInput-root:-webkit-autofill:hover, .MuiOutlinedInput-root:-webkit-autofill:focus, .MuiOutlinedInput-root:-webkit-autofill:active': {
        borderRadius: '25px',
        WebkitBoxShadow: '0 0 0 30px white inset !important',
        WebkitTextFillColor: 'black !important',
      },
    }),
  };

  const { register: registerAdd, handleSubmit: handleSubmitAdd, formState: { errors: errorsAdd } } = useForm<IAddFormInput>();
  const { register: registerDelete, handleSubmit: handleSubmitDelete, formState: { errors: errorsDelete } } = useForm<IDeleteFormInput>();
  const [addMovie, { isLoading: isAddMovieLoading }] = useAddMovieMutation();
  const [deleteMovie, { isLoading: isDeleteMovieLoading }] = useDeleteMovieMutation();

  const onSubmitAdd: SubmitHandler<IAddFormInput> = async (data) => {
    try {
      await addMovie({ movieData: data.movieData }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitDelete: SubmitHandler<IDeleteFormInput> = async (data) => {
    try {
      await deleteMovie({ movieData: data.movieData }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div css={styles.container}>
      <form css={styles.form} onSubmit={handleSubmitAdd(onSubmitAdd)}>
        <div css={[styles.formControl, styles.roundedInput]}>
          <TextField
            className="rounded-input"
            type="text"
            label="Добавить фильм"
            {...registerAdd('movieData', { required: 'Это поле обязательно' })}
            error={!!errorsAdd.movieData}
            helperText={errorsAdd.movieData ? errorsAdd.movieData.message : ''}
            variant="outlined"
          />
        </div>
        <div css={styles.formControl}>
          <Button type="submit" disabled={isAddMovieLoading} variant="contained">
            {isAddMovieLoading ? <CircularProgress size={24} /> : 'Добавить'}
          </Button>
        </div>
      </form>
      <form css={styles.form} onSubmit={handleSubmitDelete(onSubmitDelete)}>
        <div css={[styles.formControl, styles.roundedInput]}>
          <TextField
            className="rounded-input"
            type="text"
            label="Удалить фильм"
            {...registerDelete('movieData', { required: 'Это поле обязательно' })}
            error={!!errorsDelete.movieData}
            helperText={errorsDelete.movieData ? errorsDelete.movieData.message : ''}
            variant="outlined"
          />
        </div>
        <div css={styles.formControl}>
          <Button type="submit" disabled={isDeleteMovieLoading} variant="contained">
            {isDeleteMovieLoading ? <CircularProgress size={24} /> : 'Удалить'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
