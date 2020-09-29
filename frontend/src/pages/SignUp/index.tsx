import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup.string().min(3, 'At least 3 characters'),
  email: yup
    .string()
    .required('Email is a required field')
    .email('Must be a valid email'),
  password: yup.string().min(6, 'At least 6 characters'),
});

const SignUp: React.FC = () => {
  const { register, handleSubmit } = useForm<SignUpForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SignUpForm) => console.log(data);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="Barbershop" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign Up</h1>
          <Input
            name="name"
            icon={FiUser}
            placeholder="Name"
            register={register}
          />
          <Input
            name="email"
            icon={FiMail}
            placeholder="Email"
            register={register}
          />
          <Input
            name="password"
            icon={FiLock}
            placeholder="Password"
            type="password"
            register={register}
          />
          <Button type="submit">Register</Button>
        </form>
        <a href="#sign-in">
          <FiArrowLeft />
          Go back to sign in.
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
