import React from 'react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'

import { displayCoinToCoin } from '@core/exchange'
import { NftAsset } from '@core/network/api/nfts/types'
import { Button, Table, TableCell, TableHeader, TableRow, Text } from 'blockchain-info-components'
import { NftOrderStepEnum } from 'data/components/nfts/types'

import { StickyTableHeader } from '../../../components'
import { Props as OwnProps } from '../..'

const CTA: React.FC<Props> = (props) => {
  const { defaultEthAddr, nftActions } = props

  const listings = props.asset.orders.filter(
    (order) => order.maker.address.toLowerCase() === defaultEthAddr.toLowerCase()
  )
  const getType = (order) => {
    return order.sale_kind === 1 ? 'Descending' : order.extra !== '0' ? 'Ascending' : 'Fixed Price'
  }

  return (
    <>
      {props.asset.orders.length ? (
        <>
          <Text size='16px' weight={600} color='grey900'>
            <FormattedMessage id='copy.active_listings' defaultMessage='Active Listings:' />
          </Text>
          <Table style={{ maxHeight: '150px', overflow: 'scroll' }}>
            <StickyTableHeader>
              <TableCell>
                <Text size='12px' weight={600}>
                  Price
                </Text>
              </TableCell>
              <TableCell>
                <Text size='12px' weight={600}>
                  Expires
                </Text>
              </TableCell>
              <TableCell>
                <Text size='12px' weight={600}>
                  Type
                </Text>
              </TableCell>
              <TableCell style={{ justifyContent: 'center' }}>
                <Text size='12px' weight={600}>
                  Actions
                </Text>
              </TableCell>
            </StickyTableHeader>
            {props.asset.orders.map((order) => {
              return (
                <>
                  <TableRow key={order.order_hash}>
                    <TableCell>
                      <Text size='14px' weight={600}>
                        {displayCoinToCoin({
                          coin: order.payment_token_contract?.symbol || 'ETH',
                          value: order.current_price
                        })}
                      </Text>
                    </TableCell>
                    <TableCell>
                      {order.closing_date ? (
                        <Text size='14px' weight={600}>
                          {moment(order.closing_date).fromNow(true)}
                        </Text>
                      ) : (
                        <Text size='20px' weight={600} style={{ paddingLeft: '0.5em' }}>
                          ∞
                        </Text>
                      )}
                    </TableCell>
                    <TableCell>
                      <Text size='14px' weight={600}>
                        {getType(order)}
                      </Text>
                    </TableCell>
                    <TableCell style={{ justifyContent: 'center' }}>
                      <Button
                        small
                        onClick={() => {
                          nftActions.setListingToCancel({ order })
                          nftActions.setOrderFlowStep({
                            step: NftOrderStepEnum.CANCEL_LISTING
                          })
                        }}
                        nature='primary'
                        data-e2e='cancelListingNft'
                      >
                        <FormattedMessage id='button.cancel' defaultMessage='Cancel' />
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              )
            })}
          </Table>
        </>
      ) : null}
    </>
  )
}

type Props = OwnProps & { asset: NftAsset }

export default CTA
