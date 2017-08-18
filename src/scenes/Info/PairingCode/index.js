import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import { Badge, Text } from 'blockchain-info-components'
import { SettingComponent, SettingContainer, SettingDescription, SettingHeader, SettingSummary } from 'components/Setting'
import Settings from './Settings'

const BadgesContainer = styled.div`
  display: block;
  padding: 10px 0;
  & > * { display:inline; margin-right: 5px; }
`

const PairingCode = (props) => {
  return (
    <SettingContainer>
      <SettingSummary>
        <SettingHeader>
          <FormattedMessage id='scenes.info.pairingcode.title' defaultMessage='Mobile app pairing code' />
        </SettingHeader>
        <SettingDescription>
          <FormattedMessage id='scenes.info.pairingcode.description' defaultMessage="Scan the code (click on 'Show Pairing Code') with your Blockchain Wallet (iOS or Android) for a seamless connection to your wallet." altFont light />
          <FormattedMessage id='scenes.info.pairingcode.description2' defaultMessage='Download our mobiles applications below' />
          <Text color='red'>
            <FormattedMessage id='scenes.info.pairingcode.warning' defaultMessage='Do not share your Pairing Code with others.' />
          </Text>
          <BadgesContainer>
            <Badge name='applestore' />
            <Badge name='googleplay' />
          </BadgesContainer>
        </SettingDescription>
      </SettingSummary>
      <SettingComponent>
        <Settings />
      </SettingComponent>
    </SettingContainer>
  )
}

export default PairingCode
