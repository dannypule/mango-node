const formatFromDb = item => {
  return {
    uuid: item.uuid,
    name: item.name,
    timezone: item.timezone,
    dateFormat: item.date_format,
    timeFormat: item.time_format,
    firstDayOfTheWeek: item.first_day_of_week,
    logo: item.logo,
    status: item.status,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  };
};

const formatForDb = item => {
  return {
    name: item.name,
    timezone: item.timezone,
    date_format: item.dateFormat,
    time_format: item.timeFormat,
    first_day_of_week: item.firstDayOfTheWeek,
    logo: item.logo,
    status: item.status
  };
};

export default {
  formatFromDb,
  formatForDb
};
