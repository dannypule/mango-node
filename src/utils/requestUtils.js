const LIMIT = 15;

const getCurrentPage = req => parseInt(req.query.page, 10) || 1; // page 1 default

const getNumberOfPages = data => Math.ceil(data.count / LIMIT);

const getOffset = req => LIMIT * (getCurrentPage(req) - 1);

const formatDbResponse = (data, formatFromDb) => data.rows.map(formatFromDb);

const getWhere = (req, where) => {
  const { uuid } = req.query;
  let newWhere = {};

  if (uuid) {
    newWhere = {
      ...newWhere,
      uuid
    };
  }

  Object.keys(where).forEach(key => {
    if (where[key]) {
      newWhere = {
        ...newWhere,
        [key]: where[key]
      };
    }
  });

  return newWhere;
};

const getSortBy = req => req.query.sortBy || 'created_at';

const getSortOrder = req => req.query.sortOrder || 'DESC';

const getDbQuery = ({ req, where = {} }) => ({
  where: getWhere(req, where),
  limit: LIMIT,
  offset: getOffset(req),
  order: [[getSortBy(req), getSortOrder(req)]]
});

const getResponseBody = (req, data, formatFromDb) => {
  const page = getCurrentPage(req);
  const pages = getNumberOfPages(data);
  const formatted = formatDbResponse(data, formatFromDb);
  return { content: formatted, count: data.count, pages, page, length: formatted.length };
};

export default {
  getDbQuery,
  getResponseBody
};
