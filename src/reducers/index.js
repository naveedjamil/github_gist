import {
    SEARCH_STARTED,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    SEARCH_CLEAR,
    FORK_REQUEST,
    FORK_SUCCESS,
    FORK_FAILURE,
    FORK_TOGGLE,
} from '../actions'


const initState = { loading: false, requested: false, moreRecordsUrl: undefined, pageCount: 0, error: null, change: false, data: [] };

export default function app(state = initState, action) {
    let newState, item;
    switch (action.type) {
        case SEARCH_CLEAR:
            return { ...state, loading: false, requested: false, moreRecordsUrl: undefined, pageCount: 0, data:[] }
        case SEARCH_STARTED:
            return { ...state, loading: true };
        case SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                requested: true,
                data: state.data.concat(action.result.data),
                moreRecordsUrl: action.result.moreRecordsUrl,
                pageCount: state.pageCount + 1
            };
        case SEARCH_FAILURE:
            return { ...state, loading: false, error: action.error };
        case FORK_REQUEST:
            newState = { ...state };
            newState.data.find(x => x.id === action.id).loadingForkData = true;
            return newState;
        case FORK_SUCCESS:
            newState = { ...state };
            newState.change = !newState.change;
            item = newState.data.find(x => x.id === action.id);
            item.loadingForkData = false;
            item.forks = action.result;
            return newState;
        case FORK_FAILURE:
            newState = { ...state };
            item = newState.data.find(x => x.id === action.id);
            item.loadingForkData = false;
            item.errorLoadingFork = true;
            return newState;
        case FORK_TOGGLE:
            newState = { ...state };
            newState.change = !newState.change;
            item = newState.data.find(x => x.id === action.id);
            item.expanded = !item.expanded;
            return newState;
        default:
            return { ...state };
    }
}