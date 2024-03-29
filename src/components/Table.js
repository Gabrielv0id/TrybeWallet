import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses } from '../redux/actions';

class Table extends Component {
  handleDelete = (id, total) => {
    const { dispatch } = this.props;
    dispatch(deleteExpenses(id, total));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{(+expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{(+expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {(+expense.exchangeRates[expense.currency].ask
                    * expense.value).toFixed(2)}
                </td>
                <td>BRL</td>
                <td>
                  <button type="button">editar</button>
                  <button
                    type="button"
                    id={ expense.id + 1 }
                    onClick={
                      () => this.handleDelete(expense.id, (+expense
                        .exchangeRates[expense.currency].ask
                        * expense.value))
                    }
                    data-testid="delete-btn"
                  >
                    excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
