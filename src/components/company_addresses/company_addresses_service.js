export const formatFromDb = item => {
  return {
    id: item.id,
    addressLine1: item.address_line_1,
    addressLine2: item.address_line_2,
    addressLine3: item.address_line_3,
    addressLine4: item.address_line_4,
    town: item.town,
    county: item.county,
    country: item.country,
    postCode: item.post_code,
    typeCode: item.type_code,
    companyId: item.company_id,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }
}

export const formatForDb = item => {
  return {
    address_line_1: item.addressLine1,
    address_line_2: item.addressLine2,
    address_line_3: item.addressLine3,
    address_line_4: item.addressLine4,
    town: item.town,
    county: item.county,
    country: item.country,
    post_code: item.postCode,
    type_code: item.typeCode,
    company_id: item.companyId,
  }
}
