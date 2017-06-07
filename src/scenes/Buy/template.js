import React from 'react'
import CSSModules from 'react-css-modules'

import style from './style.scss'

const Buy = () => {
  return (
    <section styleName='buy'>
      <span>Buy bitcoin page</span>
    </section>
  )
}

export default CSSModules(Buy, style)
