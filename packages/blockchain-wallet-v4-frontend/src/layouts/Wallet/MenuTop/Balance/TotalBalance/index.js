import React from 'react'
import { connect } from 'react-redux'
import { getData } from './selectors'
import Success from './template.success'

class TotalBalance extends React.Component {
  render () {
    const { data } = this.props
    return (
      data.cata({
        Success: (value) => <Success symbol={value.symbol} totalFiatBalance={value.totalFiatBalance} />,
        Failure: (msg) => <div>{msg}</div>,
        Loading: () => <div>loading</div>,
        NotAsked: () => <div>not asked</div>
      })
    )
  }
}

const mapStateToProps = (state) => ({
  data: getData(state)
})

export default connect(mapStateToProps)(TotalBalance)
