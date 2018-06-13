import React from 'react'
import styled from 'styled-components'
import { reduxForm, Field } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import { concat, path } from 'ramda'

import { Text, Button } from 'blockchain-info-components'
import { FormGroup, FormItem, SelectBoxUSState, SelectBoxCountry, TextBox } from 'components/Form'
import { spacing } from 'services/StyleService'
import { required, onPartnerCountryWhitelist } from 'services/FormHelper'
import BuySellAnimation from './BuySellAnimation'

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  @media (max-width: 993px) {
    align-items: flex-start;
  }
`
const ColLeft = styled.div`
  width: 50%;
  margin-right: 5%;
  margin-top: -28px;
  @media (max-width: 993px) {
    display: none;
  }
`
const ColRight = styled.div`
  width: 40%;
  margin-top: -56px;
  @media (max-width: 993px) {
    width: 100%;
    margin-top: 30px;
  }
`
const PartnerHeader = styled.div`
  font-size: 30px;
  font-weight: 600;
`
const PartnerSubHeader = styled.div`
  margin-top: 5px;
  font-size: 14px;
`
const Intro = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const SelectionContainer = Intro.extend`
  margin-top: 25px;
`
const FieldWrapper = Intro.extend`
  margin-top: 5px;
  width: 50%;
`
const UnavailableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`
const SubmittedWrapper = styled.span`
  text-align: center;
  margin-top: 35px;
`

const SelectPartner = (props) => {
  const { invalid, options, pristine, submitEmail, ui, fields } = props
  const { country, stateSelection, email } = fields
  const sfoxStates = path(['platforms', 'web', 'sfox', 'states'], options)
  const sfoxCountries = path(['platforms', 'web', 'sfox', 'countries'], options)
  const coinifyCountries = path(['platforms', 'web', 'coinify', 'countries'], options)
  const countries = concat(sfoxCountries, coinifyCountries)

  const onSfoxWhitelist = usState => usState.code && sfoxStates.includes(usState.code) ? undefined : 'This service is not yet available in your state.'

  const onSubmit = () => {
    if (sfoxCountries.indexOf(country) >= 0) {
      props.modalActions.showModal('SfoxExchangeData', { step: 'account' })
    }
    if (coinifyCountries.indexOf(country) >= 0) {
      props.modalActions.showModal('CoinifyExchangeData', { step: 'account', country })
    }
  }

  const renderColLeft = () => {
    if (!pristine && ((country && onPartnerCountryWhitelist(country, null, null, null, countries)) || (stateSelection && onSfoxWhitelist(stateSelection)))) {
      return (
        <UnavailableContainer>
          <Text size='14px' weight={300} style={spacing('mb-15')}>
            {
              country === 'US'
                ? <FormattedMessage id='selectpartner.unavailable.unfortunatelystate' defaultMessage='Unfortunately buy & sell is not available in your state at this time. To be notified when we expand to your location, sign up below.' />
                : <FormattedMessage id='selectpartner.unavailable.unfortunatelycountry' defaultMessage='Unfortunately buy & sell is not available in your country at this time. To be notified when we expand to your location, sign up below.' />
            }
          </Text>
          {
            !ui.submittedEmail
              ? <span>
                <Field name='email' component={TextBox} placeholder='Add your email here' />
                <Button style={spacing('mt-15')} nature='primary' onClick={submitEmail}>
                  <FormattedMessage id='selectpartner.unavailable.notifyme' defaultMessage='Notify Me When This Becomes Available' />
                </Button>
              </span>
              : <SubmittedWrapper>
                <Text size='16px' color='brand-primary'>
                  <FormattedMessage id='selectpartner.unavailable.thanks' defaultMessage='Thanks!' />
                </Text>
                <Text size='14px' weight={300}>
                  <FormattedMessage id='selectpartner.unavailable.sendemail' defaultMessage='We will send an email to {email} once buy & sell are available for your area.' values={{ email: <strong>{email}</strong> }} />
                </Text>
              </SubmittedWrapper>
          }
        </UnavailableContainer>
      )
    } else {
      return (
        <BuySellAnimation country={country} options={options} />
      )
    }
  }

  return (
    <Row>
      <ColLeft>
        { renderColLeft() }
      </ColLeft>
      <ColRight>
        <Intro>
          <PartnerHeader>
            <FormattedMessage id='selectpartner.header' defaultMessage='Introducing Buy & Sell' />
          </PartnerHeader>
          <PartnerSubHeader>
            <FormattedMessage id='selectpartner.subheader' defaultMessage='You can now buy & sell bitcoin directly from your wallet and have the exchanged funds deposited into your bank account.' />
          </PartnerSubHeader>
          <PartnerSubHeader style={spacing('mt-15')}>
            <FormattedMessage id='selectpartner.subheader2' defaultMessage="Select your location below, verify your identity, and before you know it, you'll be on your way to making your crypto dreams a reality!" />
          </PartnerSubHeader>
        </Intro>
        <SelectionContainer>
          <Text size='14px'>
            <FormattedMessage id='selectpartner.selectcountry' defaultMessage='Select your country:' />
          </Text>
          <FieldWrapper>
            <form onSubmit={onSubmit}>
              <FormGroup>
                <FormItem>
                  <Field name='country' validate={[required, onPartnerCountryWhitelist]} component={SelectBoxCountry} errorBottom />
                </FormItem>
              </FormGroup>
              {
                country === 'US'
                  ? (
                    <FormGroup style={spacing('mt-5')}>
                      <FormItem>
                        <Field name='state' validate={[required]} component={SelectBoxUSState} errorBottom />
                      </FormItem>
                    </FormGroup>
                  )
                  : null
              }
              <Button nature='primary' uppercase type='submit' disabled={invalid || pristine} style={spacing('mt-15')}>
                <FormattedMessage id='selectpartner.getstarted' defaultMessage='get started' />
              </Button>
            </form>
          </FieldWrapper>
        </SelectionContainer>
      </ColRight>
    </Row>
  )
}

export default reduxForm({ form: 'selectPartner' })(SelectPartner)
