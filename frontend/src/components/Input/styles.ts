import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isDirty: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232119;
  border-radius: 10px;
  padding: 0 16px;
  width: 100%;
  height: 55px;

  border: 2px solid #232119;
  color: #666360;

  /* when input is focused */
  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
      color: #ff9000;
    `}

  /* when input is dirty */
  ${props =>
    props.isDirty &&
    css`
      color: #ff9000;
    `}

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;
    height: 100%;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
