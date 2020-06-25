import { LOGOUT_SUCCESS } from '../actions/types';
import auth from './auth';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import jobs from './jobs';

const appReducer = combineReducers({
    form: formReducer,
    auth,
    jobs
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;

// import auth from "./auth";
// import { combineReducers } from 'redux';
// import jobs from "./jobs";

// const jobList = combineReducers({
//     jobs, auth
// })

// export default jobList;