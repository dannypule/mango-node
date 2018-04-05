export const formatCarResponse = item => {
  return {
    id: item.CarID,
    model: item.Model,
    year: item.Year,
    dateCreated: item.DateCreated,
    dateUpdated: item.DateUpdated,
  }
}

export const formatCarDbSave = item => {
  return {
    Model: item.model,
    Year: item.year,
  }
}
