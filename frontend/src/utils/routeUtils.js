export const getDataSelection = location => {
  const value = new URLSearchParams(location.search).get('data')
  return value === 'expenses' || value === 'staff' ? value : 'income'
}
