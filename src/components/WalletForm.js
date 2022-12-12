import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="expense">
            Valor:
            <input
              type="number"
              data-testid="value-input"
              id="expense"
              name="expense"
            />
          </label>
          <label htmlFor="currencieType">
            Moeda:
            <select
              name="currencies"
              id="currencieType"
              data-testid="currency-input"
            >
              {currencies.map((currency) => (
                <option key={ currency } value={ currency }>{currency}</option>))}
            </select>
          </label>
          <label htmlFor="method">
            Metodo de pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
            >
              <option value="cash">Dinheiro</option>
              <option value="credit">Cartão de crédito</option>
              <option value="debit">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
            >
              <option value="food">Alimentação</option>
              <option value="fun">Lazer</option>
              <option value="work">Trabalho</option>
              <option value="transport">Transporte</option>
              <option value="health">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              id="description"
              name="description"
            />
          </label>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});
export default connect(mapStateToProps)(WalletForm);
