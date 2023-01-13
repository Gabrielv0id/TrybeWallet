import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('Testando o Login', () => {
  test('Verifica se a tela Home renderiza corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const emailEl = screen.getByRole('textbox', {
      name: /email:/i,
    });

    const passwordEl = screen.getByLabelText(/password:/i);

    const buttonEl = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(emailEl).toBeInTheDocument();
    expect(passwordEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toBeDisabled();
  });

  test('verifica se ao digitar o botao age corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const emailEl = screen.getByTestId('email-input');
    const passwordEl = screen.getByTestId('password-input');
    const buttonEl = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(emailEl, 'g@g.com');
    userEvent.type(passwordEl, '12345');
    expect(buttonEl.disabled).toBe(true);

    userEvent.clear(emailEl);
    userEvent.clear(passwordEl);

    userEvent.type(emailEl, 'g@gcom');
    userEvent.type(passwordEl, '12345');
    expect(buttonEl.disabled).toBe(true);

    userEvent.clear(emailEl);
    userEvent.clear(passwordEl);

    userEvent.type(emailEl, 'g@g.com');
    userEvent.type(passwordEl, '123456');
    expect(buttonEl.disabled).toBe(false);
  });
});
describe('testando a wallet', () => {
  test('testando se renderiza todos os documentos corretamente', async () => {
    const currencies = ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'];
    const initialEntries = ['/carteira'];
    const initialState = {
      user: {
        emai: 'g@g.com',
      },
      wallet: {
        currencies,
      },
    };
    const {
      history } = renderWithRouterAndRedux(<App />, { initialEntries }, { initialState });
    const emailEl = screen.getByTestId('email-field');
    const totalEl = screen.getByTestId('total-field');
    const cambioEl = screen.getByTestId('header-currency-field');
    const valorEl = screen.getByTestId('value-input');
    const currencyEl = screen.getByTestId('currency-input');
    const methodEl = screen.getByTestId('method-input');
    const tagEl = screen.getByTestId('tag-input');
    const descriptionEl = screen.getByTestId('description-input');
    const buttonEl = screen.getByRole('button', {
      name: /adicionar despesas/i,
    });

    expect(emailEl).toBeInTheDocument();
    expect(totalEl).toBeInTheDocument();
    expect(cambioEl).toBeInTheDocument();
    expect(valorEl).toBeInTheDocument();
    expect(currencyEl).toBeInTheDocument();
    expect(methodEl).toBeInTheDocument();
    expect(tagEl).toBeInTheDocument();
    expect(descriptionEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
    expect(history.location.pathname).toBe('/carteira');
    // await waitFor(() => {
    //   expect(store.getState().user.email).toBe('g@g.com');
    //   expect(store.getState().wallet.currencies).toBe(currencies);
    // });

    userEvent.type(valorEl, '26,00');
    userEvent.type(descriptionEl, 'lanche');
    userEvent.click(buttonEl);

    expect(valorEl.innerText).toBe('26,00');
    expect(descriptionEl.innerText).toBe('lanche');

    test('adicionando despesas', async () => {
      renderWithRouterAndRedux(<App />, { initialEntries });
      const cashOptionEl = screen.getByRole('option', { name: 'Dinheiro' });
      const eatOptionEl = screen.getByRole('option', { name: 'Alimentação' });
      const USDOptionEl = await screen.findByRole('option', { name: 'USD' });
      userEvent.type(valorEl, '5');
      userEvent.type(descriptionEl, 'cinco dólares');
      userEvent.selectOptions(currencyEl, USDOptionEl);
      userEvent.selectOptions(methodEl, cashOptionEl);
      userEvent.selectOptions(tagEl, eatOptionEl);
      userEvent.click(buttonEl);
    });
  });
  test('Verifica se o botão "excluir" funciona', async () => {
    const initialEntries = ['/carteira'];
    const initialState = {
      wallet: {
        currencies: Object.keys(mockData),
        expenses: [
          {
            value: '20',
            description: 'Almoço',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Alimentação',
            id: 0,
            exchangeRates: mockData,
          },
          {
            value: '5',
            description: 'Parque de Diversao',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Lazer',
            id: 1,
            exchangeRates: mockData,
          },
        ],
        editor: false,
        idToEdit: 0,
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });

    const totalExpensesEl = screen.getByTestId('total-field');
    const deleteButtonEl = screen.getAllByRole('button', { name: /excluir/i });

    expect(totalExpensesEl).toHaveTextContent('118,83');
    userEvent.click(deleteButtonEl[0]);
    expect(totalExpensesEl).toHaveTextContent('23,77');
  });
});
