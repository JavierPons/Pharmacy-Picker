import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import perscriptions from './perscriptions';
import pharmacies from './pharmacies';

const rootReducer = combineReducers({
  perscriptions,
  pharmacies,
  form: formReducer
});

export default rootReducer;
