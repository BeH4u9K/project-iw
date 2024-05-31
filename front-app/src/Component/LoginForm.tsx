import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLoginMutation } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import styled from 'styled-components';
import '../ComponentCss/LoginForm.css';


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

const Container = styled.div`
  background-color: #888;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 305px;
  border-radius: 50px;
`;

const Form = styled.form`
  width: 100%;
`;

const FormControl = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const ErrorText = styled(Typography)`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

const SuccessText = styled(Typography)`
  color: green;
  text-align: center;
  margin-top: 20px;
`;

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
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
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <TextField
            className="rounded-input"
            type="text"
            label="Введите ваш телефон"
            {...register('phone')}
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : ''}
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <TextField
            className="rounded-input"
            type="password"
            label="Введите ваш пароль"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <Button type="submit" disabled={isLoading} variant="contained">
            {isLoading ? <CircularProgress size={24} /> : 'Отправить'}
          </Button>
        </FormControl>
      </Form>
      {isError && <ErrorText variant="body1">{renderError()}</ErrorText>}
      {isSuccess && <SuccessText variant="body1">Сообщение успешно отправлено!</SuccessText>}
    </Container>
  );
};

export default LoginForm;
