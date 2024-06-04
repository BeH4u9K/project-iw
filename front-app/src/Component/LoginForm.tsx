/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLoginMutation } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import '../ComponentCss/LoginForm.css';

interface IFormInput {
  phone: string;
  password: string;
}

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

const styles = {
  container: css({
    backgroundColor: '#888',
    display: 'flex',
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
  errorText: css({
    color: 'red',
    textAlign: 'center',
    marginTop: '20px',
  }),
  successText: css({
    color: 'green',
    textAlign: 'center',
    marginTop: '20px',
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

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await login(data).unwrap();
      if (response.success) {
        if (response.admin) {
          navigate('/admin');
        } else {
          navigate('/movie');
        }
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
    <div css={styles.container}>
      <form css={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div css={styles.formControl}>
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
        <div css={styles.formControl}>
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
        <div css={styles.formControl}>
          <Button type="submit" disabled={isLoading} variant="contained">
            {isLoading ? <CircularProgress size={24} /> : 'Отправить'}
          </Button>
        </div>
      </form>
      {isError && <Typography css={styles.errorText} variant="body1">{renderError()}</Typography>}
      {isSuccess && <Typography css={styles.successText} variant="body1">Сообщение успешно отправлено!</Typography>}
    </div>
  );
};

export default LoginForm;
