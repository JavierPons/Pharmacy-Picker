import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import perscriptions from './perscriptions';

const rootReducer = combineReducers({
  perscriptions,
  form: formReducer
});

export default rootReducer;
