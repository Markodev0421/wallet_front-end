import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import { Modal, ModalHeader, ModalBody } from 'blockchain-info-components'

const SendEth = props => (
  <Modal size='large' position={props.position} total={props.total}>
    <ModalHeader icon='paper-airplane-filled' onClose={props.closeAll}>
      <FormattedMessage
        id='modals.sendether.title'
        defaultMessage='Send Ether'
      />
    </ModalHeader>
    <ModalBody>{props.children}</ModalBody>
  </Modal>
)

SendEth.propTypes = {
  position: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  closeAll: PropTypes.func.isRequired
}

export default SendEth
