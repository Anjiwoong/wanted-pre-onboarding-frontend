import styled from 'styled-components';
import { AuthTitleTypes } from '../../types/auth-types';

const AuthTitle = ({ loginPage }: AuthTitleTypes) => {
  return <Title>{loginPage ? '로그인' : '회원가입'}</Title>;
};

const Title = styled.h1`
  font-size: 42px;
  text-align: center;
`;

export default AuthTitle;
