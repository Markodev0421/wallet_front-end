import { lift, prop } from 'ramda'

import { Exchange } from 'blockchain-wallet-v4/src'
import { fiatToString } from 'blockchain-wallet-v4/src/exchange/currency'
import { CoinTypeEnum, FiatTypeEnum } from 'blockchain-wallet-v4/src/types'
import { selectors } from 'data'

export const getData = (state, coinSymbol, amount, defaultCurrency, defaultRates) => {
  const coin = coinSymbol === 'USD-D' ? 'PAX' : coinSymbol
  const currencyR = selectors.core.settings.getSettings(state).map(prop('currency'))

  const ratesR = selectors.core.data.misc.getRatesSelector(coin, state)

  let value
  if (coin in CoinTypeEnum) {
    value = Exchange.convertCoinToCoin({
      coin,
      value: amount,
    })
  }

  const convert = (currency, rates) => {
    if (coin in FiatTypeEnum) {
      if (coin === currency) return fiatToString({ unit: currency, value: amount })

      value = Exchange.convertFiatToFiat({
        fromCurrency: coin,
        rates,
        toCurrency: currency,
        value: amount,
      })
      return fiatToString({ unit: currency, value })
    }
    return Exchange.displayCoinToFiat({
      rates: defaultRates || rates,
      toCurrency: defaultCurrency || currency,
      value,
    })
  }
  return lift(convert)(currencyR, ratesR)
}
