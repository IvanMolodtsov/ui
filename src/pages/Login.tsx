import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { FC } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { LoginDto, LoginSchema } from '../dto/LoginDto';
import styles from './Login.module.scss';
import { loginRequest } from '../api/auth.api';
import { useMutation } from '@tanstack/react-query';

export const Login: FC = () => {

  const login = useMutation({
    mutationFn: (dto: LoginDto) => {
      return loginRequest(dto);
    }
  })

  const form = useForm({
    defaultValues: {
      login: "",
      password: ""
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      return login.mutate(value);
    },
    validators: {
      onChange: LoginSchema
    },
  });

  if (login.isSuccess) {
    return <Navigate to="/home" replace />
  } 



  return (
    <div className={styles.container}>
      <Paper elevation={10} className={styles.modal}>
        <div className={styles.header}>
          <Avatar style={{ backgroundColor: 'var(--primary)' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h4" component="h2">
            Login
          </Typography>
        </div>
        <form
          className={styles.form}
          onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}>
          <form.Field
            name="login"
            validators={{
              onChange: LoginSchema.shape.login,
            }}
            children={({ state, handleChange, handleBlur }) => (
              <Box style={{ minHeight: '80px' }}>
                <TextField
                  id="login"
                  name="login"
                  defaultValue={state.value}
                  onChange={e => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  label="E-mail"
                  type="email"
                  placeholder="Enter e-mail"
                  error={state.meta.errors.length > 0}
                  helperText={state.meta.errors}
                  fullWidth
                  required
                />
              </Box>
            )}
          />

          <form.Field
            name="password"
            validators={{
              onChange: LoginSchema.shape.password,
            }}
            children={({ state, handleChange, handleBlur }) => (
              <Box style={{ minHeight: '80px' }}>
                <TextField
                  id="password"
                  name="password"
                  defaultValue={state.value}
                  onChange={e => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  error={state.meta.errors.length >= 1}
                  helperText={state.meta.errors}
                  label="Password"
                  placeholder="Enter password"
                  type="password"
                  fullWidth
                  required
                />
              </Box>
            )}
          />

          <FormControlLabel
            label="Remember me"
            control={<Checkbox name="rememberMe" color="primary" />}
          />
          <form.Subscribe
            selector={state => [state.canSubmit]}
            children={([canSubmit]) => (
              <Button
                color="primary"
                variant="outlined"
                disabled={!canSubmit}
                type="submit">
                Sign in
              </Button>
            )}
          />
        </form>
        <Typography variant="subtitle1" component="p">
          Have no account? <Link to="register">Register</Link>
        </Typography>
      </Paper>
    </div>
  );
};
