import { mapCoordinates } from '../utils/coordinates'

export const getData = state => {
  return state.data.map(d => {
    const income = {
      values: [d.incomeGrants, d.incomeFundraising, d.incomeOther],
      labels: ['Grants', 'Fundraising', 'Other'],
    }

    const expenses = {
      values: [d.expensesCampaigns, d.expensesCampaignSupport, d.expensesContributions, d.expensesOrgSupport],
      labels: ['Campaigns', 'Campaign Support', 'Contributions', 'Organisational Support'],
    }

    const staff = {
      values: [d.staffCampaigns, d.staffCampaignSupport, d.staffFundraising, d.staffOrgSupport],
      labels: ['Campaigns', 'Campaign Support', 'Fundraising', 'Organisational Support'],
    }

    income.total = income.values.reduce((a, b) => a + b, 0)
    expenses.total = expenses.values.reduce((a, b) => a + b, 0)
    staff.total = staff.values.reduce((a, b) => a + b, 0)

    return { name: d.name, income, expenses, staff }
  })
}

export const getProgramData = state => {
  return state.data.map(d => {
    const income = {
      values: [d.incomeGrants, d.incomeFundraising, d.incomeOther],
      labels: ['Grants', 'Fundraising', 'Other'],
    }

    const expenses = {
      values: [d.expensesCampaigns, d.expensesCampaignSupport, d.expensesContributions, d.expensesOrgSupport],
      labels: ['Campaigns', 'Campaign Support', 'Contributions', 'Organisational Support'],
    }

    const staff = {
      values: [d.staffCampaigns, d.staffCampaignSupport, d.staffFundraising, d.staffOrgSupport],
      labels: ['Campaigns', 'Campaign Support', 'Fundraising', 'Organisational Support'],
    }

    income.total = income.values.reduce((a, b) => a + b, 0)
    expenses.total = expenses.values.reduce((a, b) => a + b, 0)
    staff.total = staff.values.reduce((a, b) => a + b, 0)

    return { name: d.name, income, expenses, staff }
  })
}

export const getDataWithCoordinates = state => getWithCoordinates(state, getData)

export const getProgramDataWithCoordinates = state => getWithCoordinates(state, getProgramData)

export const getWithCoordinates = (state, dataSelector) =>
  dataSelector(state)
    .filter(d => !!mapCoordinates[d.name])
    .map(d => ({ ...d, coordinates: mapCoordinates[d.name] }))
