const LIMIT = 15;

const getCurrentPage = req => parseInt(req.query.page, 10) || 1; // page 1 default

const getNumberOfPages = data => Math.ceil(data.count / LIMIT);

const getOffset = req => LIMIT * (getCurrentPage(req) - 1);

const formatDbResponse = (data, formatFromDb) => data.rows.map(formatFromDb);

const getDbQuery = (req, options = { where: {} }) => {
  const { uuid } = req.query;
  const limit = LIMIT;
  const offset = getOffset(req);
  const { where } = options;
  const dbQuery = {
    where: {},
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  };

  if (uuid) {
    dbQuery.where = {
      ...dbQuery.where,
      uuid
    };
  }

  Object.keys(where).forEach(key => {
    if (where[key]) {
      dbQuery.where = {
        ...dbQuery.where,
        [key]: where[key]
      };
    }
  });

  return dbQuery;
};

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
