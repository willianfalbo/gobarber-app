import React, { useState } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('email', email);
    console.log('password', password);
  };

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Barbershop" />
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <Input
            name="email"
            icon={FiMail}
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
          <Input
            name="password"
            icon={FiLock}
            placeholder="Password"
            type="password"
            value={password}
            onChange={updatePassword}
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
