const formatFromDb = item => {
  return {
    uuid: item.uuid,
    name: item.name,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    status: item.status,
  };
};

const formatForDb = item => {
  return {
    name: item.name,
    status: item.status,
  };
};

export default {
  formatFromDb,
  formatForDb,
};
