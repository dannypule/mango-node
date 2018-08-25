export const formatFromDb = item => {
  return {
    id: item.id,
    title: item.title,
    projectCreatorId: item.project_creator_id,
    companyId: item.company_id,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    status: item.status,
  };
};

export const formatForDb = item => {
  return {
    title: item.title,
    project_creator_id: item.projectCreatorId,
    company_id: item.companyId,
    status: item.status,
  };
};
