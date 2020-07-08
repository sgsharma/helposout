import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    USER_LOADING
} from './types';

import axios from 'axios';

// LOAD USER
export const loadUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    try {
        const res = await axios.get('/api/auth/user/', tokenConfig(getState));
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

// REGISTER USER
export const register = ({ first_name, last_name, email, password, password2, organization }) => async dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({ first_name, last_name, email, password, password2, organization });

    try {
        const res = await axios.post('/api/auth/register/', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            data: err.response.data
        });
    }
};

// LOGIN USER
export const login = ({ email, password }) => async dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request Body
    var data = { email: email, password: password };
    const body = JSON.stringify(data);

    try {
        const res = await axios.post('/api/auth/login/', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            data: err.response.data
        });
    }
};

// LOGOUT USER
export const logout = () => async (dispatch, getState) => {
    await axios.post('/api/auth/logout/', null, tokenConfig(getState));
    dispatch({
        type: LOGOUT_SUCCESS
    });
};

// helper function
export const tokenConfig = getState => {
    // Get token
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};
