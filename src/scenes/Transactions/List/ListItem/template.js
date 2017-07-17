import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedDate } from 'react-intl'

import { Icon } from 'components/generic/Icon'
import { Text } from 'components/generic/Text'
import { Typography } from 'components/generic/Typography'

import ButtonAmount from './ButtonAmount'
import StatusLabel from './StatusLabel'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #DDDDDD;
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const RowDetails = styled.div`
  display: ${props => props.collapsed ? 'none' : 'flex'};
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`
const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
`
const Arrow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50px;
  transform: ${props => props.rotated ? 'rotate(-90deg)' : 'none'};
  cursor: pointer;
`
const Status = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 150px;
`
const Addresses = styled.div`
  display: none;
  @media(min-width: 1200px) { 
    display: flex; 
    flex-direction: column; 
  }
`
const Description = styled.div`
  display: none;
  @media(min-width: 1200px) { display: flex; }
`
const Edit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const EditIcon = styled(Icon)`
  cursor: pointer;
`
const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  & > * { padding: 10px 0; }

  @media(min-width: 1200px) { justify-content: space-between; }
`
const ExtraDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  & > * { padding: 10px 0; } 

  @media(min-width: 1200px) { display: none;}
`

const ListItem = (props) => {
  return (
    <Wrapper>
      <Row>
        <LeftContainer>
          <Arrow rotated={!props.detailsDisplayed} onClick={props.clickDetails}>
            <Icon name='icon-down_arrow' />
          </Arrow>
          <Status>
            <StatusLabel {...props} />
            <Typography small light italic>
              <FormattedDate value={new Date(props.transaction.time * 1000)} />
            </Typography>
          </Status>
        </LeftContainer>
        <Addresses>
          <Text id='scenes.transactions.list.listitem.to' text='To : {to}' values={{ to: props.transaction.to }} small light />
          <Text id='scenes.transactions.list.listitem.from' text='From : {from}' values={{ from: props.transaction.from }} small light />
        </Addresses>
        <Description>
          <Edit>
            { props.transaction.description !== ''
              ? <Typography small light>{props.transaction.description}</Typography>
              : <Typography small light>Add a description</Typography>
            }
            <EditIcon name='ti-pencil' />
          </Edit>
        </Description>
        <ButtonAmount {...props} />
      </Row>
      <RowDetails collapsed={!props.detailsDisplayed}>
        <ExtraDetails>
          <Edit>
            { props.transaction.description !== ''
              ? <Typography small light>{props.transaction.description}</Typography>
              : <Typography small light>Add a description</Typography>
            }
            <EditIcon name='ti-pencil' />
          </Edit>
          <Text id='scenes.transactions.list.listitem.to' text='To : {to}' values={{ to: props.transaction.to }} small light />
          <Text id='scenes.transactions.list.listitem.from' text='From : {from}' values={{ from: props.transaction.from }} small light />
        </ExtraDetails>
        <Details>
          <Typography small light>{props.transaction.status}</Typography>
          <Text id='scenes.transactions.list.listitem.initial' text='Value when received: {value}' values={{ value: props.transaction.initial_value }} small light />
        </Details>
      </RowDetails>
    </Wrapper>
  )
}

ListItem.propTypes = {
  detailsDisplayed: PropTypes.bool.isRequired,
  clickDetails: PropTypes.func.isRequired,
  transaction: PropTypes.shape({
    type: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    to: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string,
    initial_value: PropTypes.string
  })
}

export default ListItem
