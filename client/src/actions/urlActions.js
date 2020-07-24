import { GET_URLS, ADD_URL, DELETE_URL, URLS_LOADING } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getUrls = userid => (dispatch,getState) => {
    dispatch(setUrlsLoading());
    axios.get(`/api/urls/${userid}`, tokenConfig(getState)).then(res =>
        dispatch({
            type: GET_URLS,
            payload: res.data
        }))
}

export const addUrl = url => (dispatch, getState) => {
    axios.post('./api/urls', url, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_URL,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        });
}

export const deleteUrl = id => (dispatch, getState) => {
    axios.delete(`/api/urls/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_URL,
            payload: id
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        });
}

export const setUrlsLoading = () => {
    return {
        type: URLS_LOADING
    }
}