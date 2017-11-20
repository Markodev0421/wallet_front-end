import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'

import { toLower } from 'ramda'
import { actions, selectors } from 'data'
import SecondStep from './template.js'

class SecondStepContainer extends React.Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () {
    // Make request to shapeShift to create order
    console.log(this.props)
    const { source, target } = this.props.exchangeAccounts
    const sourceCoin = source.coin
    const targetCoin = target.coin
    const pair = toLower(sourceCoin + '_' + targetCoin)

    const sourceAddress = source.address || source.xpub
    const targetAddress = source.address || source.xpub
    console.log({
      depositAmount: this.props.amount,
      pair,
      returnAddress: sourceAddress,
      withdrawal: targetAddress
    })

    this.props.shapeShiftActions.createOrder({
      depositAmount: this.props.amount,
      pair,
      returnAddress: sourceAddress,
      withdrawal: targetAddress
    })
  }

  onSubmit () {
    // Submit exchange
  }

  render () {
    const { ...rest } = this.props

    return (
      <SecondStep {...rest} onSubmit={this.onSubmit} />
    )
  }
}

const mapStateToProps = (state) => ({
  exchangeAccounts: formValueSelector('exchange')(state, 'accounts'),
  amount: formValueSelector('exchange')(state, 'amount'),
  order: selectors.core.data.shapeShift.getOrder(state)
})

const mapDispatchToProps = (dispatch) => ({
  shapeShiftActions: bindActionCreators(actions.payment.shapeShift, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SecondStepContainer)
