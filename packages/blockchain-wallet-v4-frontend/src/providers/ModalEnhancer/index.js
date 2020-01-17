import { actions, selectors } from 'data'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { equals } from 'ramda'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

const mapDispatchToProps = dispatch => ({
  close: compose(
    dispatch,
    actions.modals.closeModal
  ),
  closeAll: compose(
    dispatch,
    actions.modals.closeAllModals
  ),
  replace: compose(
    dispatch,
    actions.modals.replaceModal
  ),
  update: compose(
    dispatch,
    actions.modals.updateModalOptions
  )
})

const mapStateToProps = state => ({
  modals: selectors.modals.getModals(state)
})

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default (type, options = {}) => Component =>
  enhance(
    class Modal extends PureComponent {
      state = {}

      handleClick = e => {
        const modalContainer = ReactDOM.findDOMNode(this.node)
        if (
          modalContainer &&
          !this.props.disableOutsideClose &&
          equals(modalContainer.children[0], e.target)
        ) {
          if (options.transition) {
            this.setState({ userClickedOutside: true })
            setTimeout(() => {
              this.props.close()
              this.setState({ userClickedOutside: false })
            }, options.transition)
          } else {
            this.props.close()
          }
        }
      }

      onKeyPressed = evt => {
        const event = evt || window.event
        if (event.keyCode === 27 && !options.preventEscapeClose) {
          this.props.close()
        }
      }

      render () {
        const { modals, ...rest } = this.props
        const filtered = modals.filter(m => m.type === type)
        const setRef = node => {
          if (node) {
            this.node = node
            node.focus()
          }
        }

        return filtered.length ? (
          <div>
            {filtered.map((modal, i) => (
              <div
                key={`${type}:${i}`}
                onKeyDown={this.onKeyPressed}
                onMouseDown={this.handleClick}
                ref={setRef}
                tabIndex='0'
              >
                <Component
                  ref={this.node}
                  position={modals.indexOf(modal) + 1}
                  total={modals.length}
                  {...this.state}
                  {...modal.options}
                  {...modal.props}
                  {...rest}
                />
              </div>
            ))}
          </div>
        ) : null
      }
    }
  )
