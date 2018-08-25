import { access, SUPERADMIN, ADMIN, COMPANY_ADMIN, COMPANY_EDITOR, COMPANY_VIEWER, COMPANY_REGULAR, SELF } from './accessControls';

const nextMock = jest.fn();
const jsonMock = jest.fn();
const reqMockSuperAdmin = {
  user: {
    id: 1,
    userRoleCode: SUPERADMIN,
  },
  body: {
    id: 22,
  },
};
const reqMockAdmin = {
  user: {
    id: 1,
    userRoleCode: ADMIN,
  },
  body: {
    id: 22,
  },
};
const reqMockCompanyAdmin = {
  user: {
    id: 1,
    userRoleCode: COMPANY_ADMIN,
  },
  body: {
    id: 22,
  },
};
const reqMockCompanyEditor = {
  user: {
    id: 1,
    userRoleCode: COMPANY_EDITOR,
  },
  body: {
    id: 22,
  },
};
const reqMockCompanyViewer = {
  user: {
    id: 1,
    userRoleCode: COMPANY_VIEWER,
  },
  body: {
    id: 22,
  },
};
const reqMockCompanyRegular = {
  user: {
    id: 1,
    userRoleCode: COMPANY_REGULAR,
  },
  body: {
    id: 22,
  },
};
const reqMockSelf = {
  user: {
    id: 22,
    userRoleCode: COMPANY_REGULAR,
  },
  body: {
    id: 22,
  },
};
const resMock = {
  json: jsonMock,
};

describe('Given accessControls', () => {
  describe('when access is called', () => {
    afterEach(() => {
      nextMock.mockReset();
      jsonMock.mockReset();
    });

    /* and only ADMIN only are allowed access */
    describe('and only ADMIN only are allowed access', () => {
      let accessApplied;
      beforeEach(() => {
        accessApplied = access([ADMIN]);
      });
      describe('and ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockAdmin, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and SUPERADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockSuperAdmin, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and COMPANY_ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyAdmin, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_EDITOR attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyEditor, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_VIEWER attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyViewer, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_REGULAR attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyRegular, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
    });

    /* and only COMPANY_ADMIN are allowed access */
    describe('and only COMPANY_ADMIN are allowed access', () => {
      let accessApplied;
      beforeEach(() => {
        accessApplied = access([COMPANY_ADMIN]);
      });
      describe('and COMPANY_ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyAdmin, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and COMPANY_EDITOR attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyEditor, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_REGULAR attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyRegular, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockAdmin, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and SUPERADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockSuperAdmin, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
    });

    /* and only COMPANY_EDITOR are allowed access */
    describe('and only COMPANY_EDITOR are allowed access', () => {
      let accessApplied;
      beforeEach(() => {
        accessApplied = access([COMPANY_EDITOR]);
      });
      describe('and COMPANY_ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyAdmin, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_EDITOR attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyEditor, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and COMPANY_REGULAR attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyRegular, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockAdmin, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and SUPERADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockSuperAdmin, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
    });

    /* and only COMPANY_VIEWER are allowed access */
    describe('and only COMPANY_VIEWER are allowed access', () => {
      let accessApplied;
      beforeEach(() => {
        accessApplied = access([COMPANY_VIEWER]);
      });
      describe('and COMPANY_ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyAdmin, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_VIEWER attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyViewer, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and COMPANY_REGULAR attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyRegular, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockAdmin, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and SUPERADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockSuperAdmin, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
    });

    /* and only COMPANY_ADMIN, COMPANY_EDITOR, COMPANY_VIEWER, SELF are allowed access */
    describe('and only COMPANY_VIEWER are allowed access', () => {
      let accessApplied;
      beforeEach(() => {
        accessApplied = access([COMPANY_ADMIN, COMPANY_EDITOR, COMPANY_VIEWER, SELF]);
      });
      describe('and COMPANY_ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyAdmin, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and COMPANY_EDITOR attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyEditor, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and COMPANY_VIEWER attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyViewer, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and COMPANY_REGULAR attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyRegular, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and SELF attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockSelf, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockAdmin, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and SUPERADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockSuperAdmin, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
    });

    /* and only SELF is allowed access */
    describe('and only SELF is allowed access', () => {
      let accessApplied;
      beforeEach(() => {
        accessApplied = access([SELF]);
      });
      describe('and SELF attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockSelf, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and COMPANY_ADMIN who is NOT SELF attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyAdmin, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_EDITOR who is NOT SELF attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyEditor, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_VIEWER who is NOT SELF attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyViewer, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_REGULAR who is NOT SELF attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyRegular, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockAdmin, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and SUPERADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockSuperAdmin, resMock, nextMock);
        });
        it('should call allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
