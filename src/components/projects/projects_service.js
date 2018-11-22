const formatFromDb = item => {
  return {
    uuid: item.uuid,
    title: item.title,
    projectCreatorUuid: item.project_creator_uuid,
    companyUuid: item.company_uuid,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    status: item.status,
  };
};

const formatForDb = item => {
  return {
    title: item.title,
    project_creator_uuid: item.projectCreatorUuid,
    company_uuid: item.companyUuid,
    status: item.status,
  };
};

export default {
  formatFromDb,
  formatForDb,
};
