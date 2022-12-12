import { forwardRef } from 'react';
import { InputTypes } from '../../types/input-types';

const Input = forwardRef<HTMLInputElement, InputTypes>((props, ref) => {
  return <input {...props} ref={ref} />;
});

Input.displayName = 'Input';

export default Input;
