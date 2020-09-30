import React, { InputHTMLAttributes, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  register?: any;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  icon: Icon,
  register,
  error,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  // const [isDirty, setIsDirty] = useState(false);
  const isDirty = false;

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // setIsDirty(!!register.current?.value);
  }, []);

  return (
    <Container
      className="input-container"
      isFocused={isFocused}
      isDirty={isDirty}
      hasError={!!error}
    >
      {Icon && <Icon size={20} />}
      <input
        ref={register}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
        autoComplete="off"
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
