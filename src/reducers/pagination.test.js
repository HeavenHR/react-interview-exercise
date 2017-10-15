import * as types from '../constants/ActionTypes';

import reducer, { selectors } from './pagination';

it('should return first page', () => {
	const pagination = {
		page: 1,
		itemsPerPage: 2
	};

	const data = ["one", "two", "three", "four"];

	const result = selectors.getItemsForPage(pagination, data);

	expect(result).toEqual(["one", "two"]);
});

it('should return second page', () => {
	const pagination = {
		page: 2,
		itemsPerPage: 2
	};

	const data = ["one", "two", "three", "four"];

	const result = selectors.getItemsForPage(pagination, data);

	expect(result).toEqual(["three", "four"]);
});

it('should resize page when add new friend', () => {
	const pagination = {
		page: 1,
		itemsPerPage: 2,
		size: 2
	};

	const action = {
		type: types.ADD_FRIEND
	};

	const nextState = reducer(pagination, action);

	expect(nextState).toEqual({
		page: 2,
		itemsPerPage: 2,
		size: 3
	});
});

it('should resize page when remove a friend', () => {
	const pagination = {
		page: 2,
		itemsPerPage: 2,
		size: 3
	};

	const action = {
		type: types.DELETE_FRIEND
	};

	const nextState = reducer(pagination, action);

	expect(nextState).toEqual({
		page: 1,
		itemsPerPage: 2,
		size: 2
	});
});
