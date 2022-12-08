import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    const total = 0;
    const cambio = 'BRL';
    return (
      <div>
        <span data-testid="email-field">{`Email: ${email} `}</span>
        <span data-testid="total-field">{`Despesa Total: ${total} `}</span>
        <span data-testid="header-currency-field">{cambio}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
