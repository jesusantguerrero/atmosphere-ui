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
    }).format(Number(value?.toString().replaceAll(",", "")) || 0);
  } catch (err) {
    console.error(err);
    console.error(err);
    return value;
  }
};

export const formatNumber = (
  value: number | string,
  options: Intl.NumberFormatOptions = {}
) => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options,
    }).format(Number(value?.toString().replaceAll(",", "") ?? 0) || 0);
  } catch (err) {
    console.error("atmosphere-ui:error", err);
    return value;
  }
};

export default formatMoney;
