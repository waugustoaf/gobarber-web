import styled from 'styled-components';

import Tooltip from '../Tooltip';

interface InputContainerStyleProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<InputContainerStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
  background: #232129;
  border-radius: 10px;

  border: ${props =>
    // eslint-disable-next-line no-nested-ternary
    props.isFocused
      ? '2px solid #ff9000'
      : props.isErrored
      ? '2px solid #c53030'
      : '2px solid #232129'};

  & + div {
    margin-top: 8px;
  }

  svg {
    color: ${props =>
      props.isFocused || props.isFilled ? '#ff9000' : '#666360'};
  }

  input {
    background: #232129;
    border: 0;
    padding: 16px;
    flex: 1;
    color: #f4ede8;
    margin-left: 10px;

    &::placeholder {
      color: #666360;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
