const types = ['income', 'expenses', 'staff']

export const getDataSelection = location => {
  const value = new URLSearchParams(location.search).get('data')
  return types.includes(value) ? value : types[0]
}

export const getDataSelectionIndex = location => types.indexOf(getDataSelection(location))
