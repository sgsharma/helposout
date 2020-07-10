import {
    ADD_JOB,
    ADD_JOB_FAIL,
    DELETE_JOB,
    FETCH_JOBS,
    UPDATE_JOB
} from './types';

import axios from 'axios';

export const fetchJobs = () => {
    return async dispatch => {
        let headers = { "Content-Type": "application/json" };
        const res = await fetch("/api/v1/jobs/", { headers, });
        const jobs = await res.json();
        return dispatch({
            type: FETCH_JOBS,
            jobs
        });
    }
}

export const addJob = ({ title, job_url, description, skills, category, remote_ok, paid, salary }) => async dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({ title, job_url, description, skills, category, remote_ok, paid, salary });

    try {
        const res = await axios.post('/api/v1/jobs/', body, config);
        dispatch({
            type: ADD_JOB,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ADD_JOB_FAIL,
            data: err.response.data
        });
    }
}

export const updateJob = (id, text) => {
    return {
        type: UPDATE_JOB,
        id,
        text
    }
}

export const deleteJob = id => {
    return {
        type: DELETE_JOB,
        id
    }
}