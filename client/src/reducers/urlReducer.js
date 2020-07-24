import { GET_URLS, ADD_URL, DELETE_URL, URLS_LOADING } from '../actions/types';

const initialState = {
    urls: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_URLS:
            return {
                ...state,
                urls: action.payload,
                loading: false
            }
        case DELETE_URL:
            return {
                ...state,
                urls: state.urls.filter(url => url._id !== action.payload)
            }
        case ADD_URL:
            return {
                ...state,
                urls: [action.payload, ...state.urls]
            }
        case URLS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default reducer;