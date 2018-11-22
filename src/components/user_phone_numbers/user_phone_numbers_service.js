const formatFromDb = item => {
  return {
    uuid: item.uuid,
    phone: item.phone,
    typeCode: item.type_code,
    userUuid: item.user_uuid,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    status: item.status,
  };
};

const formatForDb = item => {
  return {
    phone: item.phone,
    type_code: item.typeCode,
    user_uuid: item.userUuid,
    status: item.status,
  };
};

export default {
  formatFromDb,
  formatForDb,
};
