import React from 'react'
import './BrowserCheck.scss'

const isIE = window.navigator.userAgent.match(/(MSIE|Trident)/) && !window.navigator.userAgent.match(/Edge/)

const BrowserCheck = ({ children }) =>
  !isIE ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <div className="unsupported-browser">
      <div>
        <p>Sorry, this page does not run on Internet Explorer :(</p>
        <p>
          We recommend installing <a href="https://www.google.com/chrome/">Chrome</a> or{' '}
          <a href="https://www.mozilla.org/en-US/firefox/">Firefox</a>
        </p>
      </div>
    </div>
  )

export default BrowserCheck
