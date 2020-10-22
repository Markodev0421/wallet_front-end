import { actions, selectors } from 'data'
import { bindActionCreators, Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'data/rootReducer'
import React, { PureComponent } from 'react'
import Template from './template'

export type LinkDispatchPropsType = {
  identityVerificationActions: typeof actions.components.identityVerification
  simpleBuyActions: typeof actions.components.simpleBuy
}

class KycRequired extends PureComponent<Props> {
  state = {}

  render () {
    return <Template {...this.props} />
  }
}

const mapStateToProps = (state: RootState) => ({
  isFirstLogin: selectors.auth.getFirstLogin(state),
  order: selectors.components.simpleBuy.getSBOrder(state)
})

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchPropsType => ({
  simpleBuyActions: bindActionCreators(actions.components.simpleBuy, dispatch),
  identityVerificationActions: bindActionCreators(
    actions.components.identityVerification,
    dispatch
  )
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type OwnProps = {
  handleClose: () => void
}
export type Props = OwnProps & ConnectedProps<typeof connector>

export default connector(KycRequired)
