export const formatMoney = (
  value: number | string,
  symbol = "USD",
  options: Intl.NumberFormatOptions = {}
) => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: symbol,
      currencyDisplay: "symbol",
      ...options,
    }).format(Number(value.toString().replaceAll(",", "")) || 0);
  } catch (err) {
    console.log(err);
    return value;
  }
};

export const formatNumber = (
  value: number | string,
  options: Intl.NumberFormatOptions = {}
) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(Number(value.toString().replaceAll(",", "")) || 0);
};

export default formatMoney;
