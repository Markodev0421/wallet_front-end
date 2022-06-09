import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch } from 'react-redux'

import { Remote } from '@core'
import { NftAsset } from '@core/network/api/nfts/types'
import { Button, HeartbeatLoader, Text } from 'blockchain-info-components'
import { actions } from 'data'
import { Analytics } from 'data/types'

import NftNotInvited from '../../components/NftNotInvited'
import PendingEthTxMessage from '../../components/PendingEthTxMessage'
import { Props as OwnProps } from '.'

const CTA: React.FC<Props> = ({ asset, data, isInvited, nftActions, orderFlow }) => {
  const { userHasPendingTxR } = orderFlow

  const dispatch = useDispatch()
  const acceptOfferClicked = () => {
    dispatch(
      actions.analytics.trackEvent({
        key: Analytics.NFT_ACCEPT_OFFER_CLICKED,
        properties: {}
      })
    )
  }

  const disabled = Remote.Loading.is(orderFlow.fees) || orderFlow.isSubmitting
  const userHasPendingTx = userHasPendingTxR.getOrElse(false)

  if (!isInvited) {
    return <NftNotInvited />
  }

  if (userHasPendingTx) {
    return <PendingEthTxMessage />
  }

  return (
    <>
      {data.cata({
        Failure: (e) => (
          <>
            <Text size='14px' weight={600} style={{ marginBottom: '8px', maxHeight: '200px' }}>
              {e}
            </Text>
            <Button jumbo nature='sent' fullwidth data-e2e='n/a' disabled>
              <FormattedMessage id='copy.accept_offer' defaultMessage='Accept Offer' />
            </Button>
          </>
        ),
        Loading: () => (
          <Button jumbo nature='primary' fullwidth data-e2e='n/a' disabled>
            <FormattedMessage id='copy.accept_offer' defaultMessage='Accept Offer' />
          </Button>
        ),
        NotAsked: () => null,
        Success: (val) => (
          <Button
            jumbo
            nature='primary'
            fullwidth
            data-e2e='acceptNftOffer'
            disabled={disabled}
            type='submit'
            onClick={() => {
              acceptOfferClicked()
              nftActions.acceptOffer({
                asset,
                gasData: val.fees,
                ...val.matchingOrder
              })
            }}
          >
            {orderFlow.isSubmitting ? (
              <HeartbeatLoader color='blue100' height='20px' width='20px' />
            ) : (
              <FormattedMessage id='copy.accept_offer' defaultMessage='Accept Offer' />
            )}
          </Button>
        )
      })}
    </>
  )
}

type Props = OwnProps & { asset: NftAsset }

export default CTA
