// import {} from 'jest'
import CompanyAddressesController from './company_addresses_controller';

const findAndCountAllMock = jest.fn().mockReturnValue({
  count: 10,
  rows: [
    {
      id: 12,
      address_line_1: 12,
      address_line_2: 12,
      address_line_3: 12,
      address_line_4: 12,
      town: 12,
      county: 12,
      country: 12,
      post_code: 12,
      type_code: 12,
      company_id: 12,
      created_at: 12,
      updated_at: 12,
    },
  ],
});
const successMock = jest.fn();
const reqMock = {
  query: { id: 1, companyId: 2 },
};
const resMock = jest.fn();
const controller = new CompanyAddressesController({ findAndCountAll: findAndCountAllMock }, { success: successMock });

describe('foo', () => {
  beforeEach(() => {
    controller.getCompanyAddresses(reqMock, resMock);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('successMock to have been called once', () => {
    const arg2 = {
      companyAddresses: [
        {
          addressLine1: 12,
          addressLine2: 12,
          addressLine3: 12,
          addressLine4: 12,
          companyId: 12,
          country: 12,
          county: 12,
          createdAt: 12,
          id: 12,
          postCode: 12,
          town: 12,
          typeCode: 12,
          updatedAt: 12,
        },
      ],
      count: 10,
      page: 1,
      pages: 1,
    };
    expect(successMock).toHaveBeenCalledWith(resMock, arg2);
  });
  it('findAndCountAllMock to have been called once', () => {
    expect(findAndCountAllMock).toHaveBeenCalledTimes(1);
  });
});
