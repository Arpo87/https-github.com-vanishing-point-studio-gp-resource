export const nroSortOptions = [
  {
    key: 'alphabetical',
    label: 'Alphabetical',
    comparator: (a, b) => (a ? a.name.localeCompare(b.name) : 0),
  },
  // {
  //   key: 'income',
  //   label: 'Income',
  //   comparator: (a, b) => a.income.total - b.income.total,
  // },
  // {
  //   key: 'expenses',
  //   label: 'Expenses',
  //   comparator: (a, b) => a.expenses.total - b.expenses.total,
  // },
  // {
  //   key: 'staff',
  //   label: 'Staff',
  //   comparator: (a, b) => a.staff.total - b.staff.total,
  // },
]

export const programmeSortOptions = [
  {
    key: 'alphabetical',
    label: 'Alphabetical',
    comparator: (a, b) => (a ? a.name.localeCompare(b.name) : 0),
  },
  {
    key: 'programmeStaffSize',
    label: 'Programme Staff Size',
    comparator: (a, b) => a.programmeStaff.total - b.programmeStaff.total,
  },
  {
    key: 'budget',
    label: 'Budget',
    comparator: (a, b) => a.programmeBudget.total - b.programmeBudget.total,
  },
  {
    key: 'battlegroundNros',
    label: 'Battleground NROs',
    comparator: (a, b) => (a ? a.name.localeCompare(b.name) : 0),
  },
  {
    key: 'regionalNros',
    label: 'Regional NROs',
    comparator: (a, b) => (a ? a.name.localeCompare(b.name) : 0),
  },
]

export const battlegroundNros = ['East Asia', 'SEA', 'Africa', 'Brazil', 'India', 'Russia', 'USA']

export const regionalNros = ['Africa', 'Andino', 'Aus Pac', 'CEE', 'East Asia', 'Nordic', 'South East Asia']

export const groupings = {
  programmeStaffSize: {
    bins: [
      'Total Programme Staff 0-25',
      'Total Programme Staff 25-50',
      'Total Programme Staff 50-75',
      'Total Programme Staff 75-100',
      'Total Programme Staff 100+',
    ],
    assignBin: nro => Math.min(Math.floor(nro.programmeStaff.total / 25), 4),
  },
  battlegroundNros: {
    bins: ['Battleground NROs', 'Non-Battleground NROs'],
    assignBin: nro => (battlegroundNros.includes(nro.name) ? 0 : 1),
  },
  regionalNros: {
    bins: ['Regional NROs', 'Non-Regional NROs'],
    assignBin: nro => (regionalNros.includes(nro.name) ? 0 : 1),
  },
}

export const groupExists = sortKey => !!groupings[sortKey]

export const groupBy = (data, key) => {
  const grouping = groupings[key]
  const initialBins = grouping.bins.map(label => ({ label, data: [] }))
  return data.reduce((reduction, nro) => {
    const binIndex = grouping.assignBin(nro)
    const bin = reduction[binIndex]
    bin.data.push(nro)
    return reduction
  }, initialBins)
}
