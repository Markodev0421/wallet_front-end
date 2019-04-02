import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { model } from 'data'
import SelectBox from '../SelectBox'
import { Icon, Text } from 'blockchain-info-components'
import { getCoins } from './selectors'

const { COIN_MODELS } = model.coins
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-overflow: ellipsis;

  & > * {
    margin-left: 5px;
  }
  & > :first-child {
    margin-right: 5px;
  }
`

const renderItem = props => {
  const { value, text, ...rest } = props
  return (
    <HeaderWrapper {...rest}>
      <Icon name={COIN_MODELS[value].icons.circle} size='22px' weight={300} />
      <Text size='14px' weight={300} cursor='pointer' data-e2e=''>
        {text}
      </Text>
    </HeaderWrapper>
  )
}

const renderDisplay = (props, children) => {
  const { value, ...rest } = props
  const e2eTag = value
    ? value.toLowerCase() + 'CurrencyOption'
    : 'currencyOption'
  return (
    <HeaderWrapper {...rest}>
      <Icon name={COIN_MODELS[value].icons.circle} size='22px' weight={300} />
      <Text size='14px' weight={300} cursor='pointer' data-e2e={e2eTag}>
        {children}
      </Text>
    </HeaderWrapper>
  )
}

class SelectBoxCoin extends React.PureComponent {
  render () {
    const { coins, ...rest } = this.props
    const elements = [{ group: '', items: coins }]
    return (
      <SelectBox
        elements={elements}
        templateDisplay={renderDisplay}
        templateItem={renderItem}
        {...rest}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  coins: getCoins(state, ownProps)
})

export default connect(mapStateToProps)(SelectBoxCoin)
