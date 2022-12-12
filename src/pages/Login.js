import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitLogin, submitCurrrencies } from '../redux/actions';
import getCurrencies from '../services/currencyAPI';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    btnDisable: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      { [name]: value },
      () => {
        this.validateButton();
      },
    );
  };

  validateButton = () => {
    const { email, password } = this.state;
    const min = 6;
    const vEmail = email && email.includes('.com');
    const vPassword = password && password.length >= min;
    if (vEmail && vPassword) {
      this.setState({
        btnDisable: false,
      });
    } else {
      this.setState({
        btnDisable: true,
      });
    }
  };

  handleSubmit = async () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    const obj = await getCurrencies();
    const currencies = Object.keys(obj).filter((element) => element !== 'USDT');
    dispatch(submitLogin(email));
    dispatch(submitCurrrencies(currencies));
    history.push('/carteira');
  };

  render() {
    const { email, password, btnDisable } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ btnDisable }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
