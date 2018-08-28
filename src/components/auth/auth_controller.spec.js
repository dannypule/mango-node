import AuthController from './auth_controller';

const reqMock = {
  body: {
    firstName: 'su',
    lastName: 'li',
    email: 'su.li@email.fake',
    password: 'supassword',
    companyId: 123,
  },
};
const resMock = {};
const utilsMock = {
  success: jest.fn(),
  fail: jest.fn(),
};
const modelMock = {
  findOne: jest.fn(),
};
const usersServiceMock = {
  addUser: jest.fn(),
};

describe('Given AuthController', () => {
  let controller;

  afterEach(() => {
    utilsMock.success.mockReset();
    utilsMock.fail.mockReset();
    modelMock.findOne.mockReset();
    usersServiceMock.addUser.mockReset();
  });

  /* register */
  describe('and `register` is called', () => {
    beforeEach(() => {
      controller = new AuthController({ model: modelMock, usersService: usersServiceMock, utils: utilsMock });
      controller.register(reqMock, resMock);
    });

    it('should call `addUser`', () => {
      const firstArg = { body: { companyId: 123, email: 'su.li@email.fake', firstName: 'su', lastName: 'li', password: 'supassword' } };
      const secondArd = {};
      const thirdArg = { companyId: 123, email: 'su.li@email.fake', firstName: 'su', lastName: 'li', password: 'supassword', status: 'ACTIVE', userRoleCode: 30 };
      const fourthArg = true;
      expect(usersServiceMock.addUser).toHaveBeenCalledWith(firstArg, secondArd, thirdArg, fourthArg);
    });
  });

  /* login */
  describe('and `login` is called', () => {
    beforeEach(() => {
      controller = new AuthController({ model: modelMock, usersService: usersServiceMock, utils: utilsMock });
      controller.login(reqMock, resMock);
    });
  });
});

