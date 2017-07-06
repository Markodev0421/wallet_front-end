import React from 'react'
import styled from 'styled-components'

import Adverts from './Adverts'
import Footer from './Footer'
import Navigation from './Navigation'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const MenuLeft = (props) => (
  <Wrapper>
    <Navigation location={props.location} />
    <Adverts />
    <Footer />
  </Wrapper>
)

export default MenuLeft
