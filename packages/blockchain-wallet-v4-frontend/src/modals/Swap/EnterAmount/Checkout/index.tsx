import { Button, Text } from 'blockchain-info-components'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import React from 'react'
import styled from 'styled-components'

import { AmountTextBox } from 'components/Exchange'
import { ErrorCartridge } from 'components/Cartridge'
import { fiatToString } from 'core/exchange/currency'
import { FlyoutWrapper } from 'components/Flyout'
import { FormattedMessage } from 'react-intl'
import { formatTextAmount } from 'services/ValidationHelper'
import { getMaxMin, maximumAmount, minimumAmount } from './validation'
import { Props as OwnProps, SuccessStateType } from '..'
import { Row } from 'blockchain-wallet-v4-frontend/src/scenes/Exchange/ExchangeForm/Layout'
import { StyledForm } from '../../components'
import { SwapAccountType } from 'data/types'

const AmountRow = styled(Row)`
  position: relative;
  padding: 24px;
  justify-content: center;
  border: 0px;
`
const Errors = styled.div`
  margin: 56px 0 24px 0;
  display: flex;
  justify-content: center;
`
const QuoteRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const CustomErrorCartridge = styled(ErrorCartridge)`
  border: 1px solid ${props => props.theme.red000};
  cursor: pointer;
`

const normalizeAmount = (
  value,
  prevValue /* allValues: SwapAmountFormValues */
) => {
  if (isNaN(Number(value)) && value !== '.' && value !== '') return prevValue
  return formatTextAmount(
    value,
    /* allValues && allValues.fix === 'FIAT' */ false
  )
}

const resizeSymbol = (isFiat, inputNode, fontSizeRatio, fontSizeNumber) => {
  const amountRowNode = inputNode.closest('#amount-row')
  const currencyNode = isFiat
    ? amountRowNode.children[0]
    : amountRowNode.children[amountRowNode.children.length - 1]
  currencyNode.style.fontSize = `${fontSizeNumber * fontSizeRatio}px`
}

const Checkout: React.FC<InjectedFormProps<{}, Props> & Props> = props => {
  const amtError =
    typeof props.formErrors.amount === 'string' && props.formErrors.amount
  const max = getMaxMin(
    'max',
    props.limits,
    props.rates[props.walletCurrency],
    props.payment
  )
  const min = getMaxMin(
    'min',
    props.limits,
    props.rates[props.walletCurrency],
    props.payment
  )

  const handleMinMaxClick = () => {
    const value = amtError === 'BELOW_MIN' ? min : max
    props.formActions.change('swapAmount', 'amount', value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.swapActions.setStep({ step: 'PREVIEW_SWAP' })
  }

  return (
    <FlyoutWrapper style={{ paddingTop: '0px' }}>
      <StyledForm onSubmit={handleSubmit}>
        <AmountRow id='amount-row'>
          <Field
            data-e2e='swapAmountInput'
            name='amount'
            component={AmountTextBox}
            validate={[maximumAmount, minimumAmount]}
            normalize={normalizeAmount}
            onUpdate={resizeSymbol.bind(null, false)}
            maxFontSize='56px'
            placeholder='0'
            fiatActive={false}
            {...{
              autoFocus: true,
              hideError: true
            }}
          />
          <Text size={'56px'} color='textBlack' weight={500}>
            {props.BASE.coin}
          </Text>
        </AmountRow>

        <QuoteRow>
          <div />
          <Text
            color='grey600'
            size='14px'
            weight={500}
            data-e2e='swapQuoteAmount'
          >
            {fiatToString({
              value:
                props.rates[props.walletCurrency].last *
                Number(props.formValues?.amount || 0),
              unit: props.walletCurrency
            })}
          </Text>
          <div />
        </QuoteRow>
        {amtError && (
          <Errors onClick={handleMinMaxClick}>
            <>
              {amtError === 'BELOW_MIN' ? (
                <CustomErrorCartridge role='button' data-e2e='sbEnterAmountMin'>
                  <FormattedMessage
                    id='copy.below_swap_min'
                    defaultMessage='Minimum Swap is {value}'
                    values={{
                      value: `${min} ${props.BASE.coin}`
                    }}
                  />
                </CustomErrorCartridge>
              ) : (
                <CustomErrorCartridge>
                  <FormattedMessage
                    id='copy.above_swap_max'
                    defaultMessage='Maximum Swap is {value}'
                    values={{
                      value: `${max} ${props.BASE.coin}`
                    }}
                  />
                </CustomErrorCartridge>
              )}
            </>
          </Errors>
        )}
        <Button
          nature='primary'
          data-e2e='previewSwap'
          type='submit'
          jumbo
          fullwidth
          style={{ marginTop: '24px' }}
          disabled={props.invalid}
        >
          <FormattedMessage
            id='buttons.preview_swap'
            defaultMessage='Preview Swap'
          />
        </Button>
      </StyledForm>
    </FlyoutWrapper>
  )
}

export type Props = OwnProps & SuccessStateType & { BASE: SwapAccountType }

export default reduxForm<{}, Props>({
  form: 'swapAmount',
  destroyOnUnmount: false
})(Checkout)
