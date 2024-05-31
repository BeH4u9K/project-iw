import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLoginMutation } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import '../ComponentCss/LoginForm.css';
import { css } from '@emotion/css'

const phoneRegex = /^\+\d{11}$/;
const passwordStrength = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/;

const schema = yup.object().shape({
  phone: yup
    .string()
    .matches(phoneRegex, 'Телефон должен быть в формате +12345678901.')
    .required('Телефон обязателен.'),
  password: yup
    .string()
    .matches(passwordStrength, 'Пример пароля (3#aAgg)')
    .required('Пароль обязателен.'),
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await login(data).unwrap();
      if (response.success) {
        navigate('/movie');
      } else {
        alert('Неверные данные');
      }
    } catch (err) {
      console.error('Не удалось отправить сообщение: ', err);
    }
  };

  const renderError = () => {
    if (!error) return null;

    if ('status' in error) {

      return `Ошибка: ${JSON.stringify(error.data)}`;
    } else {

      return `Ошибка: ${error.message}`;
    }
  };

  return (
    <div className={css`
    background-color: #888;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 305PX; 
    border-radius: 50px
    `}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css`
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    text-align: center  ;`}>
          <TextField
            className="rounded-input"
            type="text"
            label="Введите ваш телефон"
            {...register('phone')}
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : ''}
            variant="outlined"
          />
        </div>
        <div className={css`
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    text-align: center  ;`}>
          <TextField
            className="rounded-input"
            type="password"
            label="Введите ваш пароль"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            variant="outlined"
          />
        </div>
        <div className={css`
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    text-align: center  ;`}>
          <Button type="submit" disabled={isLoading} variant="contained">
            {isLoading ? <CircularProgress size={24} /> : 'Отправить'}
          </Button>
        </div>
      </form>
      {isError && (
        <Typography className={css`
        color: red;
        text-align: center;
        margin-top: 20px;`} 
         variant="body1">
          {renderError()}
        </Typography>
      )}
      {isSuccess && <Typography className={css`
    color: green;
    text-align: center;
    margin-top: 20px;`
    } variant="body1">Сообщение успешно отправлено!</Typography>}
    </div>
  );
};

export default LoginForm;
