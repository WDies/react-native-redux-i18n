import nsActions from './utils/namespace-action';

const createActions = nsActions('i18n');

export default createActions(
  'EXTEND',
  'SET_LOCALE',
);
