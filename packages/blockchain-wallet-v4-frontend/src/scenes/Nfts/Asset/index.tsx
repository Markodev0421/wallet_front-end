import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect, ConnectedProps } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { NftOrderStepEnum } from 'blockchain-wallet-v4-frontend/src/data/components/nfts/types'
import { useAssetQuery, useAssetsQuery } from 'blockchain-wallet-v4-frontend/src/generated/graphql'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { CombinedError } from 'urql'

import { Button, Icon, Text } from 'blockchain-info-components'
import { actions, selectors } from 'data'
import { RootState } from 'data/rootReducer'
import { media } from 'services/styles'

export const CoinIcon = styled(Icon).attrs({ className: 'coin-icon' })``

export const LeftColWrapper = styled.div`
  min-width: 600px;
  position: sticky;
  margin-right: 2em;
  height: 100%;
  top: 64px;
  overflow: scroll;
  background: ${(props) => props.theme.white};
  z-index: 1;
  ${media.atLeastTabletL`
  top: 72px;
  max-width: 625px;
  width: 60%;
`} > form {
    ${media.tabletL`
    display: flex;
    > div {
      flex: 1;
    }
  `}
  }
`

export const RightColWrapper = styled.div`
  position: sticky;
  height: 100%;
  top: 64px;
  overflow: scroll;
  background: ${(props) => props.theme.white};
  z-index: 1;
  ${media.atLeastTabletL`
  top: 72px;
  margin-right: 20px;
  max-width: 500px;
  width: 40%;
`} > form {
    ${media.tabletL`
    display: flex;
    > div {
      flex: 1;
    }
  `}
  }
`

export const MoreAssets = styled.div`
  width: 20%;
  position: sticky;
  height: 100%;
  top: 64px;
  overflow: scroll;
`

const CollectionName = styled.div`
  padding-bottom: 1em;
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  display: flex;
  align-items: left;
  color: #121d33;
`

const AssetName = styled.div`
  height: 20px;
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 125%;
  display: flex;
  align-items: left;
  color: #121d33;
`

const PriceHistoryTitle = styled(AssetName)`
  font-size: 24px;
  line-height: 135%;
  padding: 2em 0em 2em 0em;
`

const PriceHistory = styled(PriceHistoryTitle)`
  height: 340px;
  background: #f0f2f7;
  border: 1px solid #dfe3eb;
  box-sizing: border-box;
  border-radius: 8px;
`

const CurrentPriceBox = styled.div`
  border: 1px solid #dfe3eb;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 1em;
`
const HighestBid = styled.div`
  padding: 1em;
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #677184;
`

const DetailsBidHistory = styled(HighestBid)`
  font-size: 24px;
  color: #121d33;
`
const EthText = styled(HighestBid)`
  font-size: 24px;
  display: flex;
  line-height: 135%;
  color: #121d33;
  padding: 0.5em;
`

const CreatorOwnerBox = styled(CurrentPriceBox)`
  display: grid;
  grid-template-columns: 16em;
  grid-template-rows: auto auto;
  max-width: 100%;
  grid-gap: 10px;
  grid-auto-flow: column;
  height: 150px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
}
`

const CreatorOwnerAddress = styled.div`
  font-size: 16px;
  line-height: 150%;
  color: #121d33;
  overflow: hidden;
}
`

const Divider = styled.div`
  margin-bottom: 2em;
  position: static;
  width: 727px;
  height: 1px;
  left: 48px;
  top: 51px;
  background: #f0f2f7;
`

const Description = styled.div`
  padding: 3em 0em 3em 0em;
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #677184;
`

const TraitsWrapper = styled(CurrentPriceBox)`
  margin-top: 2em;
  padding: 1em;
  height: unset;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #677184;
}
`
const TraitCell = styled.div`
  padding: 1em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  max-width: 100%;
}
`

const Trait = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  background: rgba(240, 242, 247, 0.4);;
  border-radius: 8px;
}
`

const AddressDisplay = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 150px;
`

const AdditionalDetailsWrapper = styled(TraitsWrapper)``

const AdditionalDetails = styled.div`
  padding: 1em;
  color: #677184;
`

const NftAsset: React.FC<Props> = ({ defaultEthAddr, nftsActions, ...rest }) => {
  const { contract, id } = rest.computedMatch.params
  // @ts-ignore
  const [asset] = useAssetQuery({
    variables: { filter: { contract_address: contract, token_id: id } }
  })
  const [assets] = useAssetsQuery({
    variables: { filter: { contract_address: contract } }
  })
  return (
    <>
      <LeftColWrapper>
        <img
          alt='Asset Logo'
          height='60%'
          width='auto'
          style={{
            border: '1px solid #dfe3eb',
            borderRadius: '10%',
            borderWidth: '1px',
            marginBottom: '0.5rem',
            padding: '10px'
          }}
          src={asset?.data?.asset?.image_url || ''}
        />
        <PriceHistoryTitle>Price History</PriceHistoryTitle>
        <Divider />
        <PriceHistory />
      </LeftColWrapper>
      <RightColWrapper>
        <Divider />
        <CollectionName>
          <img
            alt='Dapp Logo'
            height='30px'
            width='auto'
            style={{ borderRadius: '50%', marginBottom: '0.5rem', paddingRight: '2px' }}
            src={asset?.data?.asset?.collection?.image_url || ''}
          />
          {asset?.data?.asset?.collection?.name}
        </CollectionName>
        <Divider />
        <AssetName>{asset?.data?.asset?.name}</AssetName>
        <Description>{asset?.data?.asset?.collection?.description}</Description>
        <Divider />
        <CurrentPriceBox>
          <HighestBid>Highest Bid</HighestBid>
          <EthText>
            <CoinIcon name='ETH' style={{ padding: '0.5em' }} />
            2.25 ETH ($8,809.20)
          </EthText>
          <Button
            data-e2e='openNftFlow'
            nature='primary'
            fullwidth
            onClick={() =>
              nftsActions.nftOrderFlowOpen({
                // @ts-ignore
                asset_contract_address: asset.data.asset.contract_address!,
                // @ts-ignore
                token_id: asset.data.asset.token_id!,
                walletUserIsAssetOwnerHack: false
              })
            }
          >
            {asset?.data?.asset?.events &&
            asset?.data?.asset?.events[0] &&
            asset?.data?.asset?.events &&
            asset?.data?.asset?.events[0].event_type === 'created' ? (
              <FormattedMessage id='copy.buy' defaultMessage='Buy' />
            ) : (
              <FormattedMessage id='copy.make_an_offer' defaultMessage='Make an Offer' />
            )}
          </Button>
        </CurrentPriceBox>
        <DetailsBidHistory>Details</DetailsBidHistory>
        <CreatorOwnerBox>
          <div style={{ color: '#677184', paddingLeft: '1em', paddingTop: '1.5em' }}>Creator</div>
          <div style={{ display: 'flex', paddingLeft: '1em' }}>
            <img
              alt='Creator Logo'
              height='30px'
              width='auto'
              style={{ borderRadius: '50%', marginBottom: '0.5rem', paddingRight: '2px' }}
              src={asset?.data?.asset?.creator?.profile_img_url || ''}
            />
            <CreatorOwnerAddress>
              <AddressDisplay>{asset?.data?.asset?.creator?.address}</AddressDisplay>
            </CreatorOwnerAddress>
          </div>
          <div style={{ color: '#677184', paddingLeft: '1em', paddingTop: '1.5em' }}>Owner</div>
          <div style={{ display: 'flex', paddingLeft: '1em' }}>
            <img
              alt='Owner Logo'
              height='30px'
              width='auto'
              style={{ borderRadius: '50%', marginBottom: '0.5rem', paddingRight: '2px' }}
              src={asset?.data?.asset?.owner?.profile_img_url || ''}
            />{' '}
            <CreatorOwnerAddress>
              <AddressDisplay>{asset?.data?.asset?.owner?.address}</AddressDisplay>
            </CreatorOwnerAddress>
          </div>
        </CreatorOwnerBox>
        <TraitsWrapper>
          Traits
          <TraitCell>
            {asset?.data?.asset?.traits?.length
              ? asset?.data?.asset?.traits.map((traits, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Trait key={index}>
                    <Text
                      capitalize
                      color='grey500'
                      size='12px'
                      weight={500}
                      style={{ padding: '0.5em' }}
                    >
                      <b>{traits?.trait_type}</b>
                    </Text>
                    <Text
                      capitalize
                      color='blue600'
                      size='14px'
                      weight={600}
                      style={{ padding: '0.5em' }}
                    >
                      {traits?.value}
                    </Text>
                    <Text
                      capitalize
                      color='grey500'
                      size='12px'
                      weight={400}
                      style={{ padding: '0.5em' }}
                    >
                      0.1% Rarity
                    </Text>
                  </Trait>
                ))
              : null}
          </TraitCell>
        </TraitsWrapper>
        <AdditionalDetailsWrapper>
          Additional Details
          <AdditionalDetails>
            <div style={{ padding: '1em' }}>
              <b>Contract Address:</b>
              <AddressDisplay>{asset?.data?.asset?.contract_address}</AddressDisplay>
            </div>
            <div style={{ padding: '1em' }}>
              <b>Token ID:</b> {asset?.data?.asset?.token_id}
            </div>
            <div style={{ padding: '1em' }}>
              <b>Token Standard:</b> ERC 721
            </div>
            <div style={{ padding: '1em' }}>
              <b>Blockchain:</b> ETH
            </div>
          </AdditionalDetails>
        </AdditionalDetailsWrapper>
      </RightColWrapper>
      <MoreAssets>
        <Text
          capitalize
          style={{ fontWeight: 'bold', padding: '1em', textDecoration: 'underline' }}
        >
          More from this collection...
        </Text>
        <div>
          {assets?.data?.assets?.length // @ts-ignore
            ? assets?.data?.assets?.map((asset, index) => {
                const link = `${'/nfts/'}${asset?.contract_address}/${asset?.token_id}`
                return (
                  <LinkContainer
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    to={link}
                  >
                    <div style={{ display: 'flex' }}>
                      <Text capitalize style={{ padding: '1em' }}>
                        <b>{asset?.name}:</b>
                      </Text>
                      <img
                        alt='Asset Logo'
                        height='200px'
                        width='auto'
                        style={{
                          border: '1px solid #dfe3eb',
                          borderRadius: '10%',
                          borderWidth: '1px',
                          marginBottom: '0.5rem',
                          padding: '10px'
                        }}
                        src={asset?.image_url || ''}
                      />
                    </div>
                  </LinkContainer>
                )
              })
            : null}
        </div>
      </MoreAssets>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  defaultEthAddr: selectors.core.kvStore.eth.getDefaultAddress(state).getOrElse('')
})

const mapDispatchToProps = (dispatch) => ({
  nftsActions: bindActionCreators(actions.components.nfts, dispatch)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type Props = ConnectedProps<typeof connector> & {
  computedMatch: { params: { contract: string; id: string } }
}

export default connector(NftAsset)
