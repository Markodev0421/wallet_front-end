import React from 'react'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'
import { Modal } from 'blockchain-info-components'
import Transition from 'react-transition-group/Transition'

const duration = 500

const defaultStyle = {
  transition: `top ${duration}ms`,
  top: '100%'
}

const transitionStyles = {
  entering: { top: '100%' },
  entered: { top: '60px' }
}

const TrayModal = styled(Modal)`
  left: 270px;
  font-weight: 300;
  overflow: hidden;
  position: absolute;
  width: calc(100% - 270px);
  height: calc(100vh - 60px);
  color: ${props => props.theme['gray-5']};
  font-family: 'Montserrat', Helvetica, sans-serif;
  > div:first-child {
    padding: 70px 40px 40px 70px;
    > span:last-child {
      top: 30px;
      right: 40px;
      position: absolute;
    }
  }
  > div:last-child {
    overflow: auto;
    padding: 70px 70px;
    height: calc(100% - 160px);
  }
  @media (max-width: 767px) {
    width: 100%;
    left: 0px;
  }
`

class Tray extends React.Component {
  handleClickOutside () {
    this.props.onClose()
  }

  render () {
    const { children, ...rest } = this.props
    return (
      <Transition in={this.props.in} timeout={0}>
        {(status) => (
          <TrayModal {...rest} type={'tray'} style={{...defaultStyle, ...transitionStyles[status]}}>
            {children}
          </TrayModal>
        )}
      </Transition>
    )
  }
}

export default onClickOutside(Tray)
