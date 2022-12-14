import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthInputTypes } from '../../types/auth-types';
import Input from '../UI/Input';

const AuthPassword = ({
  passwordRef,
  setIsValid,
  loginPage,
}: AuthInputTypes) => {
  const [password, setPassword] = useState<string>('');
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  useEffect(() => {
    if (password.length >= 8) setPasswordIsValid(true);
    else setPasswordIsValid(false);
  }, [password]);

  useEffect(() => {
    if (passwordIsValid) setIsValid(prev => ({ ...prev, password: true }));
    else setIsValid(prev => ({ ...prev, password: false }));
  }, [passwordIsValid]);

  useEffect(() => setPassword(''), [loginPage]);

  return (
    <InputWrapper>
      <label htmlFor="password">password</label>
      <Input
        type="password"
        placeholder="비밀번호는 8자리 이상입니다."
        id="password"
        value={password}
        onChange={changePasswordHandler}
        ref={passwordRef}
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

export default AuthPassword;
