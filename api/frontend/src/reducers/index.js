import auth from "./auth";
import { combineReducers } from 'redux';
import jobs from "./jobs";

const jobList = combineReducers({
    jobs, auth
})

export default jobList;