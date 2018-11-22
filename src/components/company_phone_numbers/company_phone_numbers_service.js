const formatFromDb = item => {
  return {
    uuid: item.uuid,
    phone: item.phone,
    typeCode: item.type_code,
    companyUuid: item.company_uuid,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    status: item.status,
  };
};

const formatForDb = item => {
  return {
    phone: item.phone,
    type_code: item.typeCode,
    company_uuid: item.companyUuid,
    status: item.status,
  };
};

export default {
  formatFromDb,
  formatForDb,
};
