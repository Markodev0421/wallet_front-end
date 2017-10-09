import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { formValueSelector } from 'redux-form'
import { push } from 'connected-react-router'

import { filter, isNil } from 'ramda'
import { actions, selectors } from 'data'
import SecondStep from './template.js'

class SecondStepContainer extends React.Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (e) {
    e.preventDefault()
    this.props.paymentActions.sendBitcoin(this.props.selection)
  }

  render () {
    return <SecondStep {...this.props} onSubmit={this.onSubmit} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const to = formValueSelector('sendBitcoin')(state, 'to')
  const to2 = formValueSelector('sendBitcoin')(state, 'to2')
  const from = formValueSelector('sendBitcoin')(state, 'from')
  const message = formValueSelector('sendBitcoin')(state, 'message')
  // console.log('from', from)
  // console.log(selectors.core.wallet.getDefaultAccountXpub(state))
  // const toAddress = !isNil(to2) ? to2 : (to.address || selectors.core.wallet.getAccountLabel(to.index, state))
  const toAddress = 'TODO TO'
  // const fromAddress = from.address || selectors.core.wallet.getAccountLabel(from.index)(state)
  const fromAddress = 'TODO FROM'
  const selection = selectors.core.payment.getSelection(state)
  const targetCoin = filter(x => !x.change, selection.outputs)[0]
  const satoshis = targetCoin.value
  const fee = selection.fee

  return {
    fee,
    message,
    fromAddress,
    toAddress,
    satoshis,
    selection
  }
}

const mapDispatchToProps = (dispatch) => ({
  alertActions: bindActionCreators(actions.alerts, dispatch),
  modalActions: bindActionCreators(actions.modals, dispatch),
  paymentActions: bindActionCreators(actions.payment, dispatch),
  routerActions: bindActionCreators(actions.router, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SecondStepContainer)
