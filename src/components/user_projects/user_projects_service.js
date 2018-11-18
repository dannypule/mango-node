const formatFromDb = item => {
  return {
    id: item.id,
    projectId: item.project_id,
    userId: item.user_id,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    status: item.status,
  };
};

const formatForDb = item => {
  return {
    project_id: item.projectId,
    user_id: item.userId,
    status: item.status,
  };
};

export default {
  formatFromDb,
  formatForDb,
};
