export const formatGetProjectsItemResponse = item => {
  return {
    id: item.id,
    title: item.title,
    projectOwner: item.project_owner,
    companyId: item.company_id,
  }
}
