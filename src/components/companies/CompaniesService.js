export const formatFromDb = item => {
  return {
    id: item.id,
    name: item.name,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }
}

export const formatForDb = item => {
  return {
    name: item.name,
  }
}
