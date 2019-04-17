import React from 'react'
import WebFont from 'webfontloader'
import BrowserCheck from '../browser/BrowserCheck'
import Frame from '../frame/Frame'
import './App.scss'

WebFont.load({
  google: {
    families: ['Roboto:400,500,700,900'],
  },
})

const App = () => (
  <BrowserCheck>
    <Frame />
  </BrowserCheck>
)

export default App
