import {
  accessControls,
  SUPERADMIN,
  ADMIN,
  COMPANY_ADMIN,
  COMPANY_EDITOR,
  COMPANY_VIEWER,
  COMPANY_REGULAR,
  SELF,
} from './accessControls';

const nextMock = jest.fn();
const jsonMock = jest.fn();
const reqMockSuperAdmin = {
  user: {
    uuid: "a48096d2-da23-4c85-a079-7889eda5994d",
    userRoleCode: SUPERADMIN,
  },
  body: {
    uuid: "fcab0b13-99f8-4290-bf88-07e8abe5acf3",
  },
};
const reqMockAdmin = {
  user: {
    uuid: "a48096d2-da23-4c85-a079-7889eda5994d",
    userRoleCode: ADMIN,
  },
  body: {
    uuid: "fcab0b13-99f8-4290-bf88-07e8abe5acf3",
  },
};
const reqMockCompanyAdmin = {
  user: {
    uuid: "a48096d2-da23-4c85-a079-7889eda5994d",
    userRoleCode: COMPANY_ADMIN,
  },
  body: {
    uuid: "fcab0b13-99f8-4290-bf88-07e8abe5acf3",
  },
};
const reqMockCompanyEditor = {
  user: {
    uuid: "a48096d2-da23-4c85-a079-7889eda5994d",
    userRoleCode: COMPANY_EDITOR,
  },
  body: {
    uuid: "fcab0b13-99f8-4290-bf88-07e8abe5acf3",
  },
};
const reqMockCompanyViewer = {
  user: {
    uuid: "a48096d2-da23-4c85-a079-7889eda5994d",
    userRoleCode: COMPANY_VIEWER,
  },
  body: {
    uuid: "fcab0b13-99f8-4290-bf88-07e8abe5acf3",
  },
};
const reqMockCompanyRegular = {
  user: {
    uuid: "a48096d2-da23-4c85-a079-7889eda5994d",
    userRoleCode: COMPANY_REGULAR,
  },
  body: {
    uuid: "fcab0b13-99f8-4290-bf88-07e8abe5acf3",
  },
};
const reqMockSelf = {
  user: {
    uuid: "fcab0b13-99f8-4290-bf88-07e8abe5acf3",
    userRoleCode: COMPANY_REGULAR,
  },
  body: {
    uuid: "fcab0b13-99f8-4290-bf88-07e8abe5acf3",
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

    /* ================== and only ADMIN only are allowed access ================== */
    describe('and only ADMIN only are allowed access', () => {
      let accessApplied;
      beforeEach(() => {
        accessApplied = accessControls([ADMIN]);
      });
      describe('and ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockAdmin, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and SUPERADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockSuperAdmin, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and COMPANY_ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyAdmin, resMock, nextMock);
        });
        it('should NOT allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_EDITOR attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyEditor, resMock, nextMock);
        });
        it('should NOT allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_VIEWER attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyViewer, resMock, nextMock);
        });
        it('should NOT allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_REGULAR attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyRegular, resMock, nextMock);
        });
        it('should NOT allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
    });

    /* ================== and only COMPANY_ADMIN are allowed access ================== */
    describe('and only COMPANY_ADMIN are allowed access', () => {
      let accessApplied;
      beforeEach(() => {
        accessApplied = accessControls([COMPANY_ADMIN]);
      });
      describe('and COMPANY_ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyAdmin, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and COMPANY_EDITOR attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyEditor, resMock, nextMock);
        });
        it('should NOT allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_REGULAR attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyRegular, resMock, nextMock);
        });
        it('should NOT allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockAdmin, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and SUPERADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockSuperAdmin, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
    });

    /* ================== and only COMPANY_EDITOR are allowed access ================== */
    describe('and only COMPANY_EDITOR are allowed access', () => {
      let accessApplied;
      beforeEach(() => {
        accessApplied = accessControls([COMPANY_EDITOR]);
      });
      describe('and COMPANY_ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyAdmin, resMock, nextMock);
        });
        it('should NOT allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_EDITOR attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyEditor, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and COMPANY_REGULAR attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyRegular, resMock, nextMock);
        });
        it('should NOT allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockAdmin, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and SUPERADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockSuperAdmin, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
    });

    /* ================== and only COMPANY_VIEWER are allowed access ================== */
    describe('and only COMPANY_VIEWER are allowed access', () => {
      let accessApplied;
      beforeEach(() => {
        accessApplied = accessControls([COMPANY_VIEWER]);
      });
      describe('and COMPANY_ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyAdmin, resMock, nextMock);
        });
        it('should NOT allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_VIEWER attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyViewer, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and COMPANY_REGULAR attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyRegular, resMock, nextMock);
        });
        it('should NOT allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockAdmin, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and SUPERADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockSuperAdmin, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
    });

    /* ================== and only COMPANY_REGULAR are allowed access ================== */
    describe('and only COMPANY_REGULAR are allowed access', () => {
      let accessApplied;
      beforeEach(() => {
        accessApplied = accessControls([COMPANY_REGULAR]);
      });
      describe('and COMPANY_ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyAdmin, resMock, nextMock);
        });
        it('should NOT allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_VIEWER attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyViewer, resMock, nextMock);
        });
        it('should NOT allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_REGULAR attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyRegular, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockAdmin, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and SUPERADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockSuperAdmin, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
    });

    /* ================== and only COMPANY_ADMIN, COMPANY_EDITOR, COMPANY_VIEWER, SELF are allowed access ================== */
    describe('and only COMPANY_ADMIN, COMPANY_EDITOR, COMPANY_VIEWER, SELF are allowed access', () => {
      let accessApplied;
      beforeEach(() => {
        accessApplied = accessControls([COMPANY_ADMIN, COMPANY_EDITOR, COMPANY_VIEWER, SELF]);
      });
      describe('and COMPANY_ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyAdmin, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and COMPANY_EDITOR attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyEditor, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and COMPANY_VIEWER attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyViewer, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and COMPANY_REGULAR attempts access', () => {
        beforeEach(() => {
          nextMock.mockReset();
          accessApplied(reqMockCompanyRegular, resMock, nextMock);
        });
        it('should NOT allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and SELF attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockSelf, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockAdmin, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and SUPERADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockSuperAdmin, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
    });

    /* ================== and only SELF is allowed access ================== */
    describe('and only SELF is allowed access', () => {
      let accessApplied;
      beforeEach(() => {
        accessApplied = accessControls([SELF]);
      });
      describe('and SELF attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockSelf, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and COMPANY_ADMIN who is NOT SELF attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyAdmin, resMock, nextMock);
        });
        it('should NOT allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_EDITOR who is NOT SELF attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyEditor, resMock, nextMock);
        });
        it('should NOT allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_VIEWER who is NOT SELF attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyViewer, resMock, nextMock);
        });
        it('should NOT allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and COMPANY_REGULAR who is NOT SELF attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockCompanyRegular, resMock, nextMock);
        });
        it('should NOT allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(0);
        });
      });
      describe('and ADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockAdmin, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
      describe('and SUPERADMIN attempts access', () => {
        beforeEach(() => {
          accessApplied(reqMockSuperAdmin, resMock, nextMock);
        });
        it('should allow access', () => {
          expect(nextMock).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
