import { derivePageItems, deriveNextPage } from './pagination';
import { samplePages, totalPages } from './testutil';

describe('pagination util ', () => {
  it('derivePageItems should return expected page list', () => {
    const expectedPageList = derivePageItems(samplePages, 2, 3);
    
    expect(expectedPageList).toEqual([4,5,6]);
  });

  it('deriveNextPage should return expected prevPage number', () => {
    const expectedPrevPage = deriveNextPage('< prev', 2, totalPages);
    expect(expectedPrevPage).toEqual(1);
  });

  it('deriveNextPage should return 1, if there is no previous page', () => {
    const expectedPrevPage = deriveNextPage('< prev', 1, totalPages);
    expect(expectedPrevPage).toEqual(1);
  });

  it('deriveNextPage should return last page number, if there is no next page', () => {
    const expectedNextPage = deriveNextPage('next >', totalPages, totalPages);
    expect(expectedNextPage).toEqual(totalPages);
  });
});
