const nroDataTypes = ['income', 'expenses', 'staff']
const programmeDataTypes = ['programmeStaff', 'programmeBudget', 'programmeBalance']

export const getDataSelectionOptions = location =>
  location.pathname.includes('programme') ? programmeDataTypes : nroDataTypes

export const getDataSelection = location => {
  const value = new URLSearchParams(location.search).get('data')
  const options = getDataSelectionOptions(location)
  return options.includes(value) ? value : options[0]
}

export const formatValue = (value, dataSelection) =>
  dataSelection === 'staff' || dataSelection === 'programmeStaff'
    ? formatStaff(value)
    : formatCurrencyInMillionEuro(value)

export const formatPercent = (value, total) => Math.round((value / total) * 100) + '%'

export const formatCurrencyInMillionEuro = value => '\u20AC' + (value / 1000).toFixed(1) + 'M'

export const formatStaff = value => {
  if (!value) {
    return ''
  } else if (Math.round(value) === value) {
    return Math.round(value)
  } else {
    return value.toFixed(1)
  }
}
