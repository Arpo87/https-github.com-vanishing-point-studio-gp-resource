import React from 'react'
import { getDataSelection } from '../../utils'
import './PageTitle.scss'

const labels = {
  income: 'Income per NRO',
  expenses: 'Expenditure per NRO',
  staff: 'Staff per NRO',
  programmeStaff: 'Programme Staff',
  programmeBudget: 'Programme Budget',
  programmeBalance: 'Programme Costs',
}

const PageTitle = ({ location }) => {
  const dataSelectionLabel = labels[getDataSelection(location)]
  const breakdowns = location.pathname.includes('breakdowns')
  return (
    <h1 className="page-title">
      <span className="light">Showing </span>
      <span className="data-selection">{dataSelectionLabel}</span>
      <span className="light">{breakdowns ? ' with ' : ' at a '}</span>
      <span>{breakdowns ? 'breakdowns' : 'relative scale'}</span>
    </h1>
  )
}

export default PageTitle
