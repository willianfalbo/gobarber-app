import React, { InputHTMLAttributes, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  register?: any;
}

const Input: React.FC<InputProps> = ({ icon: Icon, register, ...rest }) => {
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
    <Container isFocused={isFocused} isDirty={isDirty}>
      {Icon && <Icon size={20} />}
      <input
        ref={register}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
        autoComplete="off"
      />
    </Container>
  );
};

export default Input;
