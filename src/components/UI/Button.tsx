import styled from 'styled-components';
import { ButtonTypes } from '../../types/button-types';

const Button = (props: ButtonTypes) => {
  return <ButtonUI {...props}>{props.children}</ButtonUI>;
};

const ButtonUI = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  border: none;

  &:disabled {
    cursor: not-allowed;
    background: lightgray;
  }
`;

export default Button;
