import { Form, InjectedFormProps, reduxForm } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import React from 'react'
import styled from 'styled-components'

import { Button, Icon, Image, Link, Text } from 'blockchain-info-components'
import { FlyoutWrapper } from 'components/Flyout'
import { FormGroup } from 'components/Form'
import { SBAddCardErrorType } from 'data/types'

import { Props as OwnProps, SuccessStateType } from '.'

const CustomFlyoutWrapper = styled(FlyoutWrapper)`
  height: 100%;
`
const NavText = styled(Text)`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`

const HeaderText = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
`

const StyledHeading = styled(Text)`
  font-size: 14px;
  font-weight: 600;
`

const BodyText = styled(Text)`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  padding: 0 5px;
  margin-bottom: 40px;

  & a {
    font-size: 12px;
  }
`

const TermsText = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  padding: 0 30px;
  line-height: 18px;

  & a {
    font-size: 12px;
  }
`

const Success: React.FC<InjectedFormProps<{}, Props, ErrorType> & Props> = ({
  handleSubmit,
  submitting
}) => {
  return (
    <CustomFlyoutWrapper>
      <NavText color='grey800' size='20px' weight={600}>
        <Icon
          cursor
          name='arrow-left'
          size='20px'
          color='grey600'
          role='button'
          style={{ marginRight: '24px' }}
          onClick={() =>
            // eslint-disable-next-line
            window.alert('TODO')
          }
        />
        <FormattedMessage
          id='buttons.link_bank'
          defaultMessage='Link a Bank Account'
        />
      </NavText>
      <Form onSubmit={handleSubmit}>
        <FormGroup margin='24px'>
          <HeaderText color='grey900'>
            <FormattedMessage
              id='modals.simplebuy.link_bank'
              defaultMessage='Blockchain.com uses Yodlee to verify your bank credentials & securely link your accounts. link your bank.'
            />
          </HeaderText>
          <Image
            width='297px'
            style={{ margin: '90px auto 50px' }}
            name='yodlee-connect'
          />
          <BodyText color='grey600'>
            <StyledHeading color='grey900'>
              <FormattedMessage
                id='modals.simplebuy.secure_connection'
                defaultMessage='Secure Connection'
              />
            </StyledHeading>
            <FormattedMessage
              id='modals.simplebuy.yodlee_description'
              defaultMessage='Yodlee securely stores your credentials adhering to leading industry practices for data security, regulatory compliance, and privacy.'
            />{' '}
            <Link href='/foo.html' rel='noopener noreferrer' target='_blank'>
              <FormattedMessage
                defaultMessage='Learn More.'
                id='modals.simplebuy.summary.learn_more'
              />
            </Link>
          </BodyText>
        </FormGroup>
        <FormGroup>
          <Button
            nature='primary'
            data-e2e='linkBankContinue'
            height='48px'
            size='16px'
            type='submit'
            disabled={submitting}
          >
            <FormattedMessage id='buttons.continue' defaultMessage='Continue' />
          </Button>
        </FormGroup>
        <TermsText color='grey600'>
          <FormattedMessage
            id='modals.simplebuy.link_bank_yodlee_terms'
            defaultMessage="By hitting Continue, you Agree to Yodlee's"
          />{' '}
          <Link href='/foo.html' rel='noopener noreferrer' target='_blank'>
            <FormattedMessage
              id='scenes.register.registerform.blockchain.default.terms_conditions'
              defaultMessage='Terms and Conditions'
            />
          </Link>{' '}
          <FormattedMessage
            id='scenes.securitycenter.2fa.tip.two'
            defaultMessage='and'
          />{' '}
          <Link href='/foo.html' rel='noopener noreferrer' target='_blank'>
            <FormattedMessage
              id='scenes.register.registerform.blockchain.default.privacypolicy'
              defaultMessage='Privacy Policy'
            />
          </Link>
        </TermsText>
      </Form>
    </CustomFlyoutWrapper>
  )
}

export type Props = OwnProps & SuccessStateType
export type ErrorType = SBAddCardErrorType

export default reduxForm<{}, Props, ErrorType>({
  form: 'linkBankForm',
  destroyOnUnmount: false
})(Success)
