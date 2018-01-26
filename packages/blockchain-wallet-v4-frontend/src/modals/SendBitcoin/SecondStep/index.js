import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getData } from './selectors'
import { actions } from 'data'
import SecondStep from './template.js'

class SecondStepContainer extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    const { selection } = this.props.data
    this.props.sendBitcoinActions.sendBitcoin(selection)
  }

  render () {
    const { data, ...rest } = this.props
    return <SecondStep {...rest} {...data} handleSubmit={this.handleSubmit} />
  }
}

const mapStateToProps = state => ({
  data: getData(state)
})

const mapDispatchToProps = (dispatch) => ({
  sendBitcoinActions: bindActionCreators(actions.modules.sendBitcoin, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SecondStepContainer)
