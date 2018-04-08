export const formatGetUserResponse = user => {
  return {
    id: user.UserID,
    firstName: user.FirstName,
    lastName: user.LastName,
    username: user.Username,
    email: user.Email,
    dateCreated: user.DateCreated,
    dateUpdated: user.DateUpdated,
    roleID: user.RoleID,
  }
}
