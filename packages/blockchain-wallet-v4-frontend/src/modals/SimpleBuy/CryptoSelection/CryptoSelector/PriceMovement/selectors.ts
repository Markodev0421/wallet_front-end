import { lift } from 'ramda'

import { ExtractSuccess, TimeRange } from '@core/types'
import { selectors } from 'data'
import { RootState } from 'data/rootReducer'

import { OwnProps } from '.'

export const getData = (state: RootState, ownProps: OwnProps) => {
  const { coin } = ownProps
  const price24HrR = selectors.core.data.misc.getPriceChange(coin, TimeRange.DAY, state)

  return lift((price24Hr: ExtractSuccess<typeof price24HrR>) => ({
    price24Hr
  }))(price24HrR)
}
