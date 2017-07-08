import * as types from '../constants/ActionTypes';

export function setPage(pageNo) {
    return {
        type: types.SET_PAGE,
        pageNo
    };
}