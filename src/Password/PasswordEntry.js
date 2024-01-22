// src/PasswordEntry.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PasswordEntry.css';

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={[}\]|:;"'<,>.]).*$/,
      'Password must meet the requirements'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const PasswordEntry = () => {
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Password submitted:', data.password);

    // Simulating a server response
    const isSuccess = Math.random() < 0.5;

    if (isSuccess) {
      toast.success('Password submitted successfully!');
    } else {
      toast.error('Failed to submit password. Please try again.');
    }
  };

  return (
    <div className="password-entry-container">
      <Card className="password-card">
        <CardContent>
        <Typography variant="h5" style={{ marginBottom: '30px' }}>Password Entry</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-field">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Password"
                    type="password"
                    {...field}
                    error={!!errors.password}
                    helperText={
                      errors.password ? (
                        <span className="error-message">{errors.password.message}</span>
                      ) : (
                        ''
                      )
                    }
                  />
                )}
              />
            </div>
            <div className="form-field">
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Confirm Password"
                    type="password"
                    {...field}
                    error={!!errors.confirmPassword}
                    helperText={
                      errors.confirmPassword ? (
                        <span className="error-message">{errors.confirmPassword.message}</span>
                      ) : (
                        ''
                      )
                    }
                  />
                )}
              />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default PasswordEntry;
