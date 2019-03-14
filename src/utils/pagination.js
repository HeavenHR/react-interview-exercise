import chunk from 'lodash/chunk';

export const derivePageItems = (pages = [], currentPage = 1, pageSize = 2) => {
  const listMap = chunk(pages, pageSize)
    .reduce((acc, curr, index) => ({ ...acc, [index + 1]: curr }), {});

  return listMap[currentPage];
};

export const deriveNextPage = (page, currentPage, totalPages) => {
  let nextPage = page;

  if (page === '< prev') {
    nextPage = currentPage > 1 ? currentPage - 1 : currentPage;
  } else if (page === 'next >') {
    nextPage = currentPage < totalPages ? currentPage + 1 : currentPage;
  }

  return nextPage;
}