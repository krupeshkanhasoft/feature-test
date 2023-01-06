import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    list: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CONTACT_LIST_START:
            return { ...state, loading: true, error: null }
        case actionTypes.CONTACT_LIST_FAILED:
            return { ...state, loading: false, error: true }
        case actionTypes.CONTACT_LIST_SUCCEED:
            return { ...state, loading: false, error: null, list: action.state }

        default:
            return { loading: false, error: null }
    }
}

export default reducer