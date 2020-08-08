import { getData as getBtcAddressData } from 'components/Form/SelectBoxBtcAddresses/selectors'
import {
  getErc20Data as getErc20AddressData,
  getEthData as getEthAddressData
} from 'components/Form/SelectBoxEthAddresses/selectors'
import { Remote } from 'blockchain-wallet-v4/src'

import { lift } from 'ramda'
import { OwnProps } from '.'

export const getData = (state, ownProps: OwnProps) => {
  const { coin, includeCustodial } = ownProps
  let addressDataR

  switch (coin) {
    case 'BTC':
      addressDataR = getBtcAddressData(state, {
        excludeLockbox: true,
        excludeImported: true,
        includeCustodial: includeCustodial,
        includeInterest: false,
        includeAll: false
      })
      break
    case 'ETH':
      addressDataR = getEthAddressData(state, {
        excludeLockbox: true,
        includeCustodial: includeCustodial,
        includeInterest: false
      })
      break
    case 'PAX':
      addressDataR = getErc20AddressData(state, {
        coin: 'PAX',
        includeCustodial: includeCustodial,
        includeInterest: false
      })
      break
    case 'USDT':
      addressDataR = getErc20AddressData(state, {
        coin: 'USDT',
        includeCustodial: includeCustodial,
        includeInterest: false
      })
      break

    default:
      addressDataR = Remote.Success({ data: [] })
  }

  const transform = addressData => {
    return {
      addressData
    }
  }

  return lift(transform)(addressDataR)
}
