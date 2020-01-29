import { actions } from 'data'
import { bindActionCreators, compose, Dispatch } from 'redux'
import { BorrowMinMaxType, OfferType, PaymentType, RatesType } from 'data/types'
import { CoinType, RemoteDataType, SupportedCoinsType } from 'core/types'
import { connect } from 'react-redux'
import { getData } from './selectors'
import DataError from 'components/DataError'
import Loading from './template.loading'
import React, { Component } from 'react'
import Success from './template.success'

export type OwnProps = {
  offer: OfferType
}

export type LinkDispatchPropsType = {
  borrowActions: typeof actions.components.borrow
}

export type SuccessStateType = {
  coin: CoinType
  limits: BorrowMinMaxType
  payment: PaymentType
  rates: RatesType
  supportedCoins: SupportedCoinsType
}

type LinkStatePropsType = {
  data: RemoteDataType<string | Error, SuccessStateType>
}

type Props = OwnProps & LinkDispatchPropsType & LinkStatePropsType

export class BorrowForm extends Component<Props> {
  state = {}

  componentDidMount () {
    this.props.borrowActions.initializeBorrow('BTC', this.props.offer)
  }

  componentWillUnmount () {
    this.props.borrowActions.setOffer(null)
  }

  handleRefresh = () => {
    this.props.borrowActions.initializeBorrow('BTC', this.props.offer)
  }

  handleSubmit = () => {
    this.props.borrowActions.createBorrow()
  }

  render () {
    const { data } = this.props

    return data.cata({
      Success: val => (
        <Success {...val} {...this.props} onSubmit={this.handleSubmit} />
      ),
      Failure: () => <DataError onClick={this.handleRefresh} />,
      Loading: () => <Loading />,
      NotAsked: () => <Loading />
    })
  }
}

const mapStateToProps = (state): LinkStatePropsType => ({
  data: getData(state)
})

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchPropsType => ({
  borrowActions: bindActionCreators(actions.components.borrow, dispatch)
})

const enhance = compose<any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(BorrowForm)
