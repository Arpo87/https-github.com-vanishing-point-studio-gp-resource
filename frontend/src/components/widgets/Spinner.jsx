import React from 'react'
import './Spinner.scss'

const Spinner = ({ large }) => <div className={'spinner' + (large ? ' large' : '')} />

export default Spinner
