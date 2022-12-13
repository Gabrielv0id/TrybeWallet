import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalExpense } = this.props;
    const total = totalExpense.toFixed(2);
    const cambio = 'BRL';
    return (
      <div>
        <span data-testid="email-field">{`Email: ${email} `}</span>
        <span>Despesa Total:</span>
        <span data-testid="total-field">{total}</span>
        <span data-testid="header-currency-field">{cambio}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpense: state.wallet.totalExpense,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpense: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
