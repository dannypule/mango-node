import UsersController from './users_controller';

const user = {
  id: 12,
  firstName: 'bono',
  lastName: 'u2',
  email: 'bono@u2.com',
  userRoleCode: 'role-code',
  companyId: 'company123',
  createdAt: '123',
  updatedAt: '321',
};
const findAndCountAllMock = jest.fn().mockReturnValue({
  count: 10,
  rows: [
    {
      id: 12,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: 'some-password',
      company_id: user.companyId,
      user_role_code: user.userRoleCode,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    },
  ],
});
const destroyMock = jest.fn().mockReturnValue(1);
const destroyFailMock = jest.fn().mockReturnValue(0);
const responseContent = user;
const responsePagination = {
  content: [responseContent],
  count: 10,
  page: 1,
  pages: 1,
  length: 1,
};
const successMock = jest.fn();
const failMock = jest.fn();
const reqMock = {
  query: { id: 1, companyId: 2 },
};
const resMock = jest.fn();
const addUserMock = jest.fn();
let controller;

xdescribe('UsersController', () => {
  describe('when getUsers is called', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      controller = new UsersController(
        { findAndCountAll: findAndCountAllMock, destroy: destroyMock },
        { success: successMock, fail: failMock },
        { addUser: addUserMock },
      );
      controller.getUsers(reqMock, resMock);
    });
    it('should call successMock', () => {
      expect(failMock).not.toHaveBeenCalled();
      expect(successMock).toHaveBeenCalledWith(resMock, responsePagination);
    });
    it('should call findAndCountAllMock', () => {
      expect(findAndCountAllMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('when deleteUser is called', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      controller = new UsersController(
        { findAndCountAll: findAndCountAllMock, destroy: destroyMock },
        { success: successMock, fail: failMock },
        { addUser: addUserMock },
      );
      controller.deleteUser({ body: { email: user.email } }, resMock);
    });
    it('should call successMock', () => {
      expect(failMock).not.toHaveBeenCalled();
      expect(successMock).toHaveBeenCalledWith(resMock);
    });
    describe('and user is not found', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        controller = new UsersController(
          { findAndCountAll: findAndCountAllMock, destroy: destroyFailMock },
          { success: successMock, fail: failMock },
          { addUser: addUserMock },
        );
        controller.deleteUser({ body: { email: user.email } }, resMock);
      });
      it('should call failMock', () => {
        expect(failMock).toHaveBeenCalledWith(resMock, { message: 'Unable to delete this user.' });
        expect(failMock).toHaveBeenCalledTimes(1);
        expect(successMock).not.toHaveBeenCalled();
      });
    });
  });
});
