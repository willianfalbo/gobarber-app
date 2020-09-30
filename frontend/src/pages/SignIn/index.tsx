import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { useAuth } from '../../contexts/AuthContext';

import { Container, Content } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInForm {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required('Email is a required field').email('Must be a valid email'),
  password: yup.string().min(6, 'At least 6 characters'),
});

const SignIn: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<SignInForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    shouldFocusError: false,
  });

  const { signIn } = useAuth();

  const onSubmit = (form: SignInForm) => {
    signIn({
      email: form.email,
      password: form.password,
    });
  };

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Barbershop" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign In</h1>
          <Input
            name="email"
            icon={FiMail}
            placeholder="Email"
            register={register}
            error={errors?.email?.message}
          />
          <Input
            name="password"
            icon={FiLock}
            placeholder="Password"
            type="password"
            register={register}
            error={errors?.password?.message}
          />
          <Button type="submit">Sign In</Button>
          <Link to="/forgot-password">Forgot password?</Link>
        </form>
        <Link to="/register">
          <FiLogIn />
          Create an account
        </Link>
      </Content>
    </Container>
  );
};

export default SignIn;
