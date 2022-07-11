export const currencyMap = (currencyData) => {
  return ({
    currency: currencyData.code,
    symbol: currencyData.symbol,
    currencyName: currencyData.name,
    fullName: `${currencyData.symbol} ${currencyData.name} (${currencyData.code})`,
    name: `${currencyData.symbol} (${currencyData.code})`,
    rate: currencyData.conversion_rate,
  })
}
