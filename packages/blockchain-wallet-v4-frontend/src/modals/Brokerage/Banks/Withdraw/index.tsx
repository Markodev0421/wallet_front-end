import { compose } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import React, { PureComponent } from 'react'

import {
  BeneficiaryType,
  WalletFiatType,
  WithdrawResponseType
} from 'core/types'
import { RootState } from 'data/rootReducer'
import { selectors } from 'data'
import { WithdrawStepEnum } from 'data/types'
import Flyout, { duration, FlyoutChild } from 'components/Flyout'
import ModalEnhancer from 'providers/ModalEnhancer'

import { ModalPropsType } from '../../../types'
import BankPicker from './BankPicker'
import ConfirmWithdraw from './ConfirmWithdraw'
import EnterAmount from './EnterAmount'
import WithdrawalDetails from './WithdrawalDetails'
import WithdrawalMethods from './WithdrawalMethods'

class Withdraw extends PureComponent<Props> {
  state: State = { show: false, direction: 'left' }

  componentDidMount () {
    /* eslint-disable */
    this.setState({ show: true })
    /* eslint-enable */
  }

  componentDidUpdate (prevProps: Props) {
    if (this.props.step === prevProps.step) return
    if (WithdrawStepEnum[this.props.step] > WithdrawStepEnum[prevProps.step]) {
      /* eslint-disable */
      this.setState({ direction: 'left' })
    } else {
      this.setState({ direction: 'right' })
      /* eslint-enable */
    }
  }

  handleClose = () => {
    this.setState({ show: false })
    setTimeout(() => {
      this.props.close()
    }, duration)
  }

  render () {
    return (
      <Flyout
        {...this.props}
        onClose={this.handleClose}
        in={this.state.show}
        direction={this.state.direction}
        data-e2e='custodyWithdrawModal'
      >
        {this.props.step === 'ENTER_AMOUNT' && (
          <FlyoutChild>
            <EnterAmount {...this.props} handleClose={this.handleClose} />
          </FlyoutChild>
        )}
        {this.props.step === 'WITHDRAWAL_METHODS' && (
          <FlyoutChild>
            <WithdrawalMethods {...this.props} handleClose={this.handleClose} />
          </FlyoutChild>
        )}
        {this.props.step === 'BANK_PICKER' && (
          <FlyoutChild>
            <BankPicker {...this.props} handleClose={this.handleClose} />
          </FlyoutChild>
        )}
        {this.props.step === 'CONFIRM_WITHDRAW' && (
          <FlyoutChild>
            <ConfirmWithdraw {...this.props} handleClose={this.handleClose} />
          </FlyoutChild>
        )}
        {this.props.step === 'WITHDRAWAL_DETAILS' && (
          <FlyoutChild>
            <WithdrawalDetails {...this.props} handleClose={this.handleClose} />
          </FlyoutChild>
        )}
      </Flyout>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  amount: selectors.components.withdraw.getAmount(state),
  beneficiary: selectors.components.withdraw.getBeneficiary(state),
  defaultMethod: selectors.components.brokerage.getAccount(state),
  fiatCurrency: selectors.components.withdraw.getFiatCurrency(state),
  step: selectors.components.withdraw.getStep(state),
  withdrawal: selectors.components.withdraw.getWithdrawal(state)
})

const connector = connect(mapStateToProps)

const enhance = compose(
  ModalEnhancer('CUSTODY_WITHDRAW_MODAL', { transition: duration }),
  connector
)

type OwnProps = ModalPropsType
type LinkStatePropsType =
  | {
      beneficiary?: BeneficiaryType
      fiatCurrency: WalletFiatType
      step: 'ENTER_AMOUNT'
    }
  | {
      fiatCurrency: WalletFiatType
      step: 'BANK_PICKER'
    }
  | {
      amount: string
      beneficiary: BeneficiaryType
      fiatCurrency: WalletFiatType
      step: 'CONFIRM_WITHDRAW'
    }
  | {
      step: 'WITHDRAWAL_DETAILS'
      withdrawal: WithdrawResponseType
    }
  | {
      fiatCurrency: WalletFiatType
      step: 'WITHDRAWAL_METHODS'
    }
// export type SuccessStateType = ExtractSuccess<ReturnType<typeof getData>>
export type Props = OwnProps &
  LinkStatePropsType &
  ConnectedProps<typeof connector>
type State = { direction: 'left' | 'right'; show: boolean }

export default enhance(Withdraw)
