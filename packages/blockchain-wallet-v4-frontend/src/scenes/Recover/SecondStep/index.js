import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import React from 'react'

import { actions, selectors } from 'data'
import { SpinningLoader } from 'blockchain-info-components'

import Recover from './template'

class RecoverContainer extends React.PureComponent {
  componentDidMount () {
    const { authActions, mnemonic } = this.props
    authActions.restoreFromMetadata(mnemonic)
  }

  onSubmit = () => {
    const { authActions, mnemonic, email, password, language } = this.props
    authActions.restore(mnemonic, email, password, language)
  }

  render () {
    const { metadataRestore, password, previousStep, registering } = this.props

    const isRegistering = registering.cata({
      Success: () => false,
      Failure: () => false,
      Loading: () => true,
      NotAsked: () => false
    })

    return metadataRestore.cata({
      Success: val => (
        <Recover
          previousStep={previousStep}
          onSubmit={this.onSubmit}
          isRegistering={isRegistering}
          isRestoringFromMetadata={val && !!val.sharedKey}
          password={password}
        />
      ),
      Failure: () => (
        <Recover
          previousStep={previousStep}
          onSubmit={this.onSubmit}
          isRegistering={isRegistering}
          password={password}
        />
      ),
      Loading: () => <SpinningLoader width='36px' height='36px' />,
      NotAsked: () => <SpinningLoader width='36px' height='36px' />
    })
  }
}

const mapStateToProps = state => ({
  email: formValueSelector('recover')(state, 'email'),
  registering: selectors.auth.getRegistering(state),
  metadataRestore: selectors.auth.getMetadataRestore(state),
  language: selectors.preferences.getLanguage(state),
  mnemonic: formValueSelector('recover')(state, 'mnemonic'),
  password: formValueSelector('recover')(state, 'password') || ''
})

const mapDispatchToProps = dispatch => ({
  alertActions: bindActionCreators(actions.alerts, dispatch),
  authActions: bindActionCreators(actions.auth, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RecoverContainer)
