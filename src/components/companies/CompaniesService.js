export const formatCompanyResponse = item => {
  return {
    id: item.id,
    name: item.name,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }
}

export const formatCompanyDbSave = item => {
  return {
    name: item.name,
  }
}
