export const formatFromDb = item => {
  return {
    id: item.id,
    phone: item.phone,
    typeCode: item.type_code,
    companyId: item.company_id,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }
}

export const formatForDb = item => {
  return {
    phone: item.phone,
    type_code: item.typeCode,
    company_id: item.companyId,
  }
}
