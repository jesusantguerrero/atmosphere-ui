const formatMoney = (value, currencyCode = "DOP", numberFormat = "en-US") => {
  return new Intl.NumberFormat(numberFormat, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "symbol",
  }).format(value || 0);
};
export default formatMoney;
