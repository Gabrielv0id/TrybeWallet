import { CURRENCIES_SUBMIT, EXPENSE_SUBMIT, DELETE_EXPENSE } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  totalExpense: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES_SUBMIT:
    return {
      ...state,
      currencies: action.payload,
    };
  case EXPENSE_SUBMIT:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      totalExpense: state.totalExpense
      + (+action.payload.exchangeRates[action.payload.currency].ask
        * action.payload.value),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
      totalExpense: Math.abs(state.totalExpense - (+action.amount)),
    };
  default: return state;
  }
};

export default wallet;
