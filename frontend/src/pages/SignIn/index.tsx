import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInForm {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is a required field')
    .email('Must be a valid email'),
  password: yup.string().min(6, 'At least 6 characters'),
});

const SignIn: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<SignInForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    shouldFocusError: false,
  });

  const onSubmit = (data: SignInForm) => console.log(data);

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
          <Button type="submit">SignIn</Button>
          <a href="#forgot-password">Forgot password?</a>
        </form>
        <a href="#create-account">
          <FiLogIn />
          Create an account
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
