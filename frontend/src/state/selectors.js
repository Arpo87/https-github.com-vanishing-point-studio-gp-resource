import { mapCoordinates } from '../utils/coordinates'

export const getNroData = state => {
  return state.nroData.map(d => {
    const income = {
      values: [d.incomeGrants, d.incomeFundraising, d.incomeOther],
      labels: ['Grants', 'Fundraising', 'Other'],
    }

    const expenses = {
      values: [d.expensesCampaigns, d.expensesCampaignSupport, d.expensesContributions, d.expensesOrgSupport],
      labels: ['Campaigns', 'Campaign support', 'Contributions', 'Organisational support'],
    }

    const staff = {
      values: [d.staffCampaigns, d.staffCampaignSupport, d.staffFundraising, d.staffOrgSupport],
      labels: ['Campaigns', 'Campaign support', 'Fundraising', 'Organisational support'],
    }

    income.total = income.values.reduce((a, b) => a + b, 0)
    expenses.total = expenses.values.reduce((a, b) => a + b, 0)
    staff.total = staff.values.reduce((a, b) => a + b, 0)

    return { name: d.name, income, expenses, staff }
  })
}

export const getProgrammeData = state => {
  return state.nroData.map(d => {
    const programmeStaff = {
      values: [
        d.programmeStaffCampaigns,
        d.programmeStaffCampaignCoordination,
        d.programmeStaffCampaignUnallocated,
        d.programmeStaffPolitical,
        d.programmeStaffMediaComms,
        d.programmeStaffEngagement,
        d.programmeStaffPublicInfoOutreach,
        d.programmeStaffOperations,
      ],
      labels: [
        'Campaigns',
        'Campaign coordination',
        'Campaign unallocated',
        'Political, science, & business',
        'Media & comms',
        'Engagement',
        'Public info & outreach',
        'Operations',
      ],
    }

    const programmeBudget = {
      values: [
        d.programmeBudgetCampaigns,
        d.programmeBudgetCampaignCoordination,
        d.programmeBudgetCampaignUnallocated,
        d.programmeBudgetPolitical,
        d.programmeBudgetMediaComms,
        d.programmeBudgetEngagement,
        d.programmeBudgetPublicInfoOutreach,
        d.programmeBudgetOperations,
      ],
      labels: [
        'Campaigns',
        'Campaign coordination',
        'Campaign unallocated',
        'Political, science, & business',
        'Media & comms',
        'Engagement',
        'Public info & outreach',
        'Operations',
      ],
    }

    const programmeBalance = {
      values: [d.programmeBalanceDirect, d.programmeBalanceStaff],
      labels: ['Direct', 'Staff'],
    }

    programmeStaff.total = programmeStaff.values.reduce((a, b) => a + b, 0)
    programmeBudget.total = programmeBudget.values.reduce((a, b) => a + b, 0)
    programmeBalance.total = programmeBalance.values.reduce((a, b) => a + b, 0)

    return { name: d.name, programmeStaff, programmeBudget, programmeBalance }
  })
}

export const getNroDataWithCoordinates = state => getWithCoordinates(state, getNroData)

export const getProgrammeDataWithCoordinates = state => getWithCoordinates(state, getProgrammeData)

export const getWithCoordinates = (state, dataSelector) =>
  dataSelector(state)
    .filter(d => !!mapCoordinates[d.name])
    .map(d => ({ ...d, coordinates: mapCoordinates[d.name] }))
