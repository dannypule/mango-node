export const formatGetSalesItemResponse = item => {
  return {
    id: item.SaleID,
    saleDate: item.SaleDate,
    companyName: item.CompanyName,
    productName: item.ProductName,
    productSku: item.ProductSKU,
    salesValue: item.SalesValue,
    salesCount: item.SalesCount,
  };
};
