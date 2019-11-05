import PropTypes from 'prop-types'
import React from 'react'

import ComboDisplay from './template'

class ComboDisplayContainer extends React.PureComponent {
  render () {
    return <ComboDisplay {...this.props} />
  }
}

ComboDisplay.propTypes = {
  coin: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
}

export default ComboDisplayContainer
