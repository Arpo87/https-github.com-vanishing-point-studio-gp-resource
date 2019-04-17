import React from 'react'
import './BrowserCheck.scss'

const isIE = window.navigator.userAgent.match(/(MSIE|Trident)/) && !window.navigator.userAgent.match(/Edge/)

const BrowserCheck = ({ children }) =>
  !isIE ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <div className="unsupported-browser">This page does not run on Internet Explorer.</div>
  )

export default BrowserCheck
