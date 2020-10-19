import { combineReducers } from 'redux';

import contact from './Contacts/Reducer';

const rootReducer = combineReducers({
    contact,
});

export default rootReducer;
