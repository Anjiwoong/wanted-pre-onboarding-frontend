import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthInputTypes } from '../../types/auth-types';
import Input from '../UI/Input';

const AuthEmail = ({ emailRef, setIsValid, loginPage }: AuthInputTypes) => {
  const [email, setEmail] = useState<string>('');
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  useEffect(() => {
    if (email.includes('@')) setEmailIsValid(true);
    else setEmailIsValid(false);
  }, [email]);

  useEffect(() => {
    if (emailIsValid) setIsValid(prev => ({ ...prev, email: true }));
    else setIsValid(prev => ({ ...prev, email: false }));
  }, [emailIsValid]);

  useEffect(() => setEmail(''), [loginPage]);

  return (
    <InputWrapper>
      <label htmlFor="email">email</label>
      <Input
        type="email"
        placeholder="이메일 형식을 지켜주세요."
        id="email"
        onChange={changeEmailHandler}
        value={email}
        ref={emailRef}
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  width: 500px;
  margin: 40px auto;
  text-align: center;

  label {
    display: inline-block;
    width: 100px;
    margin-right: 10px;
  }

  input {
    width: 300px;
    height: 50px;
    padding: 10px;
  }
`;

export default AuthEmail;
