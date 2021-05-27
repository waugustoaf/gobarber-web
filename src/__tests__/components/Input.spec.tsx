import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Input from '../../components/Input';

jest.mock('@unform/core', () => ({
  useField: () => ({
    fieldName: 'nome',
    defaultValue: '',
    error: '',
    registerField: jest.fn(),
  }),
}));

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="name" placeholder="Nome" />,
    );

    expect(getByPlaceholderText('Nome')).toBeTruthy();
  });

  it('should be able to highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="name" placeholder="Nome" />,
    );

    const inputElement = getByPlaceholderText('Nome');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000;');
    });
  });
});
