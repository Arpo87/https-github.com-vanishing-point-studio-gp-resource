const types = ['income', 'expenses', 'staff']

export const getDataSelection = location => {
  const value = new URLSearchParams(location.search).get('data')
  return types.includes(value) ? value : types[0]
}

export const formatValue = (value, dataSelection) =>
  dataSelection === 'staff' ? formatStaff(value) : formatCurrency(value)

export const formatPercent = (value, total) => Math.round((value / total) * 100) + '%'

// Copied from StackOverflow.
export const formatCurrency = amount => {
  const negativeSign = amount < 0 ? '-' : ''
  let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(0))).toString()
  let j = i.length > 3 ? i.length % 3 : 0
  return '\u20AC' + negativeSign + (j ? i.substr(0, j) + ',' : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1,')
}

export const formatStaff = value => {
  if (!value) {
    return ''
  } else if (Math.round(value) === value) {
    return Math.round(value)
  } else {
    return value.toFixed(1)
  }
}
