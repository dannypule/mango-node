export const formatFromDb = item => {
  return {
    id: item.id,
    projectId: item.project_id,
    userId: item.user_id,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }
}

export const formatForDb = item => {
  return {
    project_id: item.projectId,
    user_id: item.userId,
  }
}
