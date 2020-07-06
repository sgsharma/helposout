import { LOGOUT_SUCCESS } from '../actions/types';
import auth from './auth';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import jobs from './jobs';
import orgs from './orgs';

const appReducer = combineReducers({
    form: formReducer,
    auth,
    jobs,
    orgs
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;