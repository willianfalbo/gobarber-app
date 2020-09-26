import React, { useState } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('name', name);
    console.log('email', email);
    console.log('password', password);
  };

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="Barbershop" />
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <Input
            name="name"
            icon={FiUser}
            placeholder="Name"
            value={name}
            onChange={updateName}
          />
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
