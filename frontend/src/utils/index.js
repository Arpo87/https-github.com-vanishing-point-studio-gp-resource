const nroDataTypes = ['income', 'expenses', 'staff']
const programmeDataTypes = ['programmeStaff', 'programmeBudget', 'programmeBalance']

export const getDataSelectionOptions = location =>
  location.pathname.includes('programme') ? programmeDataTypes : nroDataTypes

export const getDataSelection = location => {
  const value = new URLSearchParams(location.search).get('data')
  const options = getDataSelectionOptions(location)
  return options.includes(value) ? value : options[0]
}

export const formatValue = (value, dataSelection, hideFTE, isProject) =>
  dataSelection === 'staff' || dataSelection === 'programmeStaff'
    ? formatStaff(value, hideFTE)
    : formatCurrency(value, isProject)

export const formatPercent = (value, total) => (total === 0 ? '0' : Math.round((value / total) * 100) + '%')

export const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatCurrency = (value, isProject) => {
  if (isProject) {
    if (value >= 1000) {
      return '\u20AC' + (value / 1000).toFixed(1) + 'M'
    } else if (value >= 100) {
      return '\u20AC' + numberWithCommas(value.toFixed(0)) + 'K'
    } else if (value > 0) {
      return '\u20AC' + value.toFixed(0) + 'K'
    } else {
      return '\u20AC' + 0
    }
  } else {
    if (value >= 100) {
      return '\u20AC' + (value / 1000).toFixed(1) + 'M'
    } else if (value > 0) {
      return '\u20AC' + value.toFixed(0) + 'K'
    } else {
      return '\u20AC' + 0
    }
  }
}

export const formatStaff = (value, hideFTE) => {
  let staff
  if (Math.round(value) === value) {
    staff = Math.round(value)
  } else {
    staff = value.toFixed(1)
  }
  return staff ? staff + (hideFTE ? '' : ' FTE') : 0
}

export const sanitize = name => name.replace(/ /g, '-').toLowerCase()
