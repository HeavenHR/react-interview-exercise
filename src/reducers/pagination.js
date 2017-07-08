import * as types from '../constants/ActionTypes';

const initialState = {
    currentPageNo: 0,
    currentPageIds:[0,1,2],
    pageSize:2
};

export default function friends(state = initialState, action) {
	switch (action.type) {
        case types.SET_PAGE:
            return {
                ...state,
                currentPageNo: action.pageNo
            };

		default:
			return state;
	}
}
