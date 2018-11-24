import { callApi, callForkApi } from '../api';

export const SEARCH_CLEAR = 'SEARCH_CLEAR';
export const SEARCH_STARTED = 'SEARCH_STARTED';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

export const FORK_REQUEST = 'FORK_STARTED';
export const FORK_SUCCESS = 'FORK_SUCCESS';
export const FORK_FAILURE = 'FORK_FAILURE';
export const FORK_TOGGLE = 'FORK_TOGGLE';


export const searchClear = () => ({ type: SEARCH_CLEAR });
export const searchStarted = () => ({ type: SEARCH_STARTED });
export const searchSuccess = result => ({ type: SEARCH_SUCCESS, result });
export const searchFailure = error => ({ type: SEARCH_FAILURE, error });

export const forkRequest = (id) => ({ type: FORK_REQUEST, id });
export const forkSuccess = (id, result) => ({ type: FORK_SUCCESS, id, result });
export const forkFailure = (id, error) => ({ type: FORK_FAILURE, id, error });

export const forkToggle = (id) => ({ type: FORK_TOGGLE, id });

export function loadData(username, moreRecordsUrl) {
    return (dispatch, getState) => {
        dispatch(searchStarted());

        return callApi(username, moreRecordsUrl)
            .then(
                result => dispatch(searchSuccess(result)),
                error => dispatch(searchFailure(error)),
            );
    }
}

export function loadForkData(id, fork_url) {
    return (dispatch, getState) => {
        dispatch(forkRequest(id));

        return callForkApi(fork_url)
            .then(
                result => dispatch(forkSuccess(id, result)),
                error => dispatch(forkFailure(id, error)),
            );
    }
}

export function toggleFork(id) {
    return (dispatch, getState) => {
        dispatch(forkToggle(id));
    }
}

export function clearSearch() {
    return (dispatch) => {
        dispatch(searchClear());
    }
}