const LIMIT = 15;

const getPage = req => parseInt(req.query.page, 10) || 1; // page 1 default

const getPages = data => Math.ceil(data.count / LIMIT);

const getOffset = req => LIMIT * (getPage(req) - 1);

const getFormattedFromDB = (data, formatFromDb) => data.rows.map(formatFromDb);

const getDbQuery = (req, options = { where: {} }) => {
  const { id } = req.query;
  const limit = LIMIT;
  const offset = getOffset(req);
  const { where } = options;
  const dbQuery = {
    where: {},
    limit,
    offset,
    order: [['id', 'DESC']],
  };

  if (id) {
    dbQuery.where = {
      ...dbQuery.where,
      id: parseInt(id, 10),
    };
  }

  Object.keys(where).forEach(key => {
    if (where[key]) {
      dbQuery.where = {
        ...dbQuery.where,
        [key]: where[key],
      };
    }
  });

  return dbQuery;
};

const getResponseBody = (req, data, formatFromDb) => {
  const page = getPage(req);
  const pages = getPages(data);
  const formatted = getFormattedFromDB(data, formatFromDb);
  return { content: formatted, count: data.count, pages, page, length: formatted.length };
};

export default {
  getDbQuery,
  getResponseBody,
};
