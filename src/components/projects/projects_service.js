export const formatFromDb = item => {
  return {
    id: item.id,
    title: item.title,
    projectCreator: item.project_creator,
    companyId: item.company_id,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    status: item.status,
  };
};

export const formatForDb = item => {
  return {
    title: item.title,
    project_creator: item.projectCreator,
    company_id: item.companyId,
    status: item.status,
  };
};
