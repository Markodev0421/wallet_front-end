import React from 'react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import styled from 'styled-components'

import { Icon } from 'blockchain-info-components'
import { RecurringBuyPeriods } from 'data/types'
import { Row } from 'components/Flyout'


const getPeriodTitleText = (period: RecurringBuyPeriods): React.ReactNode => {
  let text
  switch (period) {
    default:
    case RecurringBuyPeriods.DAILY:
      text = <></>
      break;
    case RecurringBuyPeriods.WEEKLY:
      text = <FormattedMessage
              id='modals.recurringbuys.time_options.weekly'
              defaultMessage='Weekly' />
      break;
    case RecurringBuyPeriods.BI_WEEKLY:
      text = <FormattedMessage
              id='modals.recurringbuys.time_options.bi_weekly'
              defaultMessage='Twice a Month' />
      break;
    case RecurringBuyPeriods.MONTHLY:
      text = <FormattedMessage
              id='modals.recurringbuys.time_options.monthly'
              defaultMessage='Monthly' />
      break;
  }
  return text
}

const getPeriodSubTitleText = (period: RecurringBuyPeriods): React.ReactNode => {
  let text
  switch (period) {
    default:
    case RecurringBuyPeriods.DAILY:
      text = <FormattedMessage
              id='modals.recurringbuys.time_options.daily'
              defaultMessage='Daily' />
      break;
    case RecurringBuyPeriods.WEEKLY:
      text = <>On {moment().format('dddd')}s</>
      break;
    case RecurringBuyPeriods.BI_WEEKLY:
      text = <>On the {moment().format('Do')} and {moment().add(2, 'weeks').format('Do')}</>
      break;
    case RecurringBuyPeriods.MONTHLY:
      text = <>On the {moment().format('Do')}</>
      break;
  }
  return text
}

const FlexWrapper = styled(Row)`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  vertical-align: center;
  padding-top: 0;
  padding-bottom: 0;
  height: 80px;
  cursor: pointer;
`
type OptionRightActionRowType = {
  onClick: () => void
  children: React.ReactChild
}
const OptionRightActionRow = ({ onClick, children }: OptionRightActionRowType) => {
  return (
    <FlexWrapper role='button' onClick={onClick}>
      <div>{children}</div>
      <Icon name='chevron-right' size='25px' color='grey400' />
    </FlexWrapper>
  )
}

export { getPeriodTitleText, getPeriodSubTitleText, OptionRightActionRow }