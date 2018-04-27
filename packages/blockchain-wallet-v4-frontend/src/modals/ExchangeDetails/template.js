import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Text, Tooltip } from 'blockchain-info-components'
import ExchangeTimeline from 'components/ExchangeTimeline'

const TimelineContainer = styled.div`
  margin-bottom: 20px;
`
const Notice = styled.div`
  width: 100%;
  margin-bottom: 10px;
`
const Table = styled.div`
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  border: 1px solid ${props => props.theme['gray-2']};
  background-color: ${props => props.theme['white-blue']};
  & > :last-child { border-bottom: none; }
  margin-bottom: 10px;
`
const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 0;
  box-sizing: border-box;
  border-bottom: 1px solid ${props => props.theme['gray-2']};

  > :first-child { margin-right: 5px; }
`
const TableCell = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  & > :first-child { margin-right: 5px; }
`

const ExchangeDetails = (props) => {
  const { position, total, close, trade } = props
  const { status, quote, sourceCoin, targetCoin } = trade
  const { quotedRate, minerFee, orderId, depositAmount, withdrawalAmount } = quote

  return (
    <Modal size='large' position={position} total={total}>
      <ModalHeader closeButton={false}>
        {status === 'complete'
          ? <FormattedMessage id='modals.exchangedetails.title_success' defaultMessage='Success! Your exchange is complete' />
          : <FormattedMessage id='modals.exchangedetails.title_inprogress' defaultMessage='Your exchange is in progress' />
        }
      </ModalHeader>
      <ModalBody>
        <TimelineContainer>
          <ExchangeTimeline status={status} />
        </TimelineContainer>
        {status === 'complete' &&
          <Notice>
            <Text size='13px' weight={300}>
              <FormattedMessage id='modals.exchangedetails.explain' defaultMessage='Your exchange is complete.' />
              <FormattedMessage id='modals.exchangedetails.explain2' defaultMessage='It may take a few minutes for the funds to show in your balance.' />
            </Text>
          </Notice>
        }
        <Table>
          <TableRow>
            <TableCell>
              <Text size='13px' weight={400} capitalize>
                <FormattedMessage id='modals.exchangedetails.deposited' defaultMessage='{coin} deposited:' values={{ coin: sourceCoin }} />
              </Text>
            </TableCell>
            <TableCell>
              <Text size='13px' weight={300} uppercase>
                {`${depositAmount} ${sourceCoin}`}
              </Text>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text size='13px' weight={400} capitalize>
                <FormattedMessage id='modals.exchangedetails.received' defaultMessage='{coin} received:' values={{ coin: targetCoin }} />
              </Text>
            </TableCell>
            <TableCell>
              <Text size='13px' weight={300} uppercase>
                {`${withdrawalAmount} ${targetCoin}`}
              </Text>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text size='13px' weight={400}>
                <FormattedMessage id='modals.exchangedetails.received' defaultMessage='Exchange rate:' />
              </Text>
              <Tooltip>
                <FormattedMessage id='modals.exchangedetails.exchangetooltip' defaultMessage='This rate may change depending on the market price at the time of your transaction.' />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Text size='13px' weight={300} uppercase>
                {`1 ${sourceCoin} = ${quotedRate} ${targetCoin}`}
              </Text>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text size='13px' weight={400}>
                <FormattedMessage id='modals.exchangedetails.fee' defaultMessage='Transaction fee:' />
              </Text>
              <Tooltip>
                <FormattedMessage id='modals.exchangedetails.feetooltip' defaultMessage='This fee is used to send the outgoing exchange funds to ShapeShift.' />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Text size='13px' weight={300} uppercase>
                {`${minerFee} ${sourceCoin}`}
              </Text>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text size='13px' weight={400} capitalize>
                <FormattedMessage id='modals.exchangedetails.orderid' defaultMessage='Order ID:' />
              </Text>
            </TableCell>
            <TableCell>
              <Text size='13px' weight={300}>
                SFT-{orderId}
              </Text>
            </TableCell>
          </TableRow>
        </Table>
      </ModalBody>
      <ModalFooter align='right'>
        <Button nature='primary' size='13px' weight={300} onClick={close}>
          <FormattedMessage id='modals.exchangedetails.close' defaultMessage='Close' />
        </Button>
      </ModalFooter>
    </Modal>
  )
}

ExchangeDetails.propTypes = {
  trade: PropTypes.object.isRequired
}

export default ExchangeDetails
