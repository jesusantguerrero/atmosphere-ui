import formatMoney, { formatNumber } from "./formatMoney";

describe("Test formatMoney", () => {
  it("formats numbers", () => {
    expect(formatNumber(1000)).toBe("1,000.00");
  });
  it("formats numbers with commas", () => {
    expect(formatNumber("1,000")).toBe("1,000.00");
  });
});
