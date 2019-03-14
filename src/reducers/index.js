import { combineReducers } from 'redux';
import { default as friendlist } from './friendlist';
import { pagination } from './pagination';

export default combineReducers({ friendlist, pagination });
