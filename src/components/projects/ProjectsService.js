export const formatFromDb = item => {
  return {
    id: item.id,
    title: item.title,
    projectOwner: item.project_owner,
    companyId: item.company_id,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }
}

export const formatForDb = item => {
  return {
    title: item.title,
    project_owner: item.projectOwner,
    company_id: item.companyId,
  }
}
