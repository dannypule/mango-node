const formatFromDb = item => {
  return {
    uuid: item.uuid,
    projectUuid: item.project_uuid,
    userUuid: item.user_uuid,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    status: item.status,
  };
};

const formatForDb = item => {
  return {
    project_uuid: item.projectUuid,
    user_uuid: item.userUuid,
    status: item.status,
  };
};

export default {
  formatFromDb,
  formatForDb,
};
