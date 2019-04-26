import React from 'react'
import WebFont from 'webfontloader'
import { Provider } from 'react-redux'
import store from '../../state/store'
import BrowserCheck from '../browser/BrowserCheck'
import Root from '../frame/Root'
import './App.scss'

WebFont.load({
  google: {
    families: ['Roboto:300,400,500,700,900'],
  },
})

const App = () => (
  <BrowserCheck>
    <Provider store={store}>
      <Root />
    </Provider>
  </BrowserCheck>
)

export default App
