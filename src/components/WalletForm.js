import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitExpenses } from '../redux/actions';
import getCurrencies from '../services/currencyAPI';

class WalletForm extends Component {
  state = {
    currency: 'USD',
    description: '',
    id: 0,
    method: 'Dinheiro',
    tag: 'Alimentação',
    value: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  buttonClick = async () => {
    const { dispatch, expenses } = this.props;
    const { currency, description, id, method, tag, value } = this.state;
    const exchangeRates = await getCurrencies();
    const expenseObj = {
      value,
      currency,
      method,
      description,
      tag,
      id,
      exchangeRates,
    };
    dispatch(submitExpenses(expenseObj));
    console.log('expenses length: ', expenses.length);
    this.setState((prevState) => ({
      currency: 'USD',
      description: '',
      id: prevState.id + 1,
      method: 'Dinheiro',
      tag: 'Alimentação',
      value: '',
    }));
  };

  render() {
    const { currencies } = this.props;
    const { currency, description, method, tag, value } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="expense">
            Valor:
            <input
              type="text"
              data-testid="value-input"
              id="expense"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currencieType">
            Moeda:
            <select
              name="currency"
              id="currencieType"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((currencie) => (
                <option key={ currencie }>{currencie}</option>))}
            </select>
          </label>
          <label htmlFor="method">
            Metodo de pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              id="description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button type="button" onClick={ this.buttonClick }>Adicionar Despesas</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};
export default connect(mapStateToProps)(WalletForm);
