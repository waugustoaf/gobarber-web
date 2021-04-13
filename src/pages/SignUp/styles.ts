import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImage from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from{
    transform: translateX(50px);
    opacity: 0;
  } 
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const AnimationContainer = styled.div`
  animation: ${appearFromLeft} 0.5s linear;

  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  form {
    margin: 80px;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  & > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImage}) no-repeat center center;
  background-size: cover;
`;
