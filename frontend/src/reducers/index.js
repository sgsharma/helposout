import { combineReducers } from 'redux';
import jobs from "./jobs";


const jobList = combineReducers({
    jobs,
})

export default jobList;