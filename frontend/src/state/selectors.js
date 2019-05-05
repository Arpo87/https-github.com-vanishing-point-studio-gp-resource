import { mapCoordinates } from '../utils/coordinates'
import { sanitize } from '../utils'

export const getNroData = (state, excludeEmpties) => {
  const data = state.nroData.map(d => {
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

    const empty = income.total === 0 && expenses.total === 0 && staff.total === 0

    return { name: d.name, income, expenses, staff, empty }
  })

  return excludeEmpties ? data.filter(d => !d.empty) : data
}

export const getProgrammeData = (state, excludeEmpties) => {
  const data = state.nroData.map(d => {
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

    const empty = programmeStaff.total === 0 && programmeBudget.total === 0 && programmeBalance.total === 0

    return { name: d.name, programmeStaff, programmeBudget, programmeBalance, empty }
  })

  return excludeEmpties ? data.filter(d => !d.empty) : data
}

export const getNroDataWithCoordinates = state => getWithCoordinates(state, getNroData)

export const getProgrammeDataWithCoordinates = state => getWithCoordinates(state, getProgrammeData)

export const getWithCoordinates = (state, dataSelector) =>
  dataSelector(state)
    .filter(d => !!mapCoordinates[d.name])
    .map(d => ({ ...d, coordinates: mapCoordinates[d.name] }))

export const getProjectGroups = state => [...new Set(state.projectData.map(project => project.projectGroup.name))]

export const lookupNroByKey = (state, nroKey) => state.nroData.find(nro => sanitize(nro.name) === nroKey)

export const getNrosWithProjectData = state =>
  state.nroData.filter(nro => state.projectData.some(project => project.nro.name === nro.name)).map(nro => nro.name)

export const getNroProjectDetails = (state, nroKey) => {
  const nro = lookupNroByKey(state, nroKey)
  const nroData = getProgrammeData(state).find(d => d.name === nro.name)
  const budgetTotal = nroData.programmeBudget.total
  const staffTotal = nroData.programmeStaff.total

  const projectsForNro = state.projectData.filter(project => project.nro.name === nro.name)
  const budgetData = projectsForNro.map(project => ({ value: project.budgetTotal, label: project.name }))
  const staffData = projectsForNro.map(project => ({ value: project.staffTotal, label: project.name }))

  const budgetRest = budgetTotal - budgetData.reduce((r, d) => r + d.value, 0)
  const staffRest = staffTotal - staffData.reduce((r, d) => r + d.value, 0)

  // Pad with some zero values to make sure the 'rest' pie slice always has the same color.
  for (let i = projectsForNro.length - 1; i < 4; i++) {
    budgetData.push({ value: 0, label: '', exclude: true })
    staffData.push({ value: 0, label: '', exclude: true })
  }

  budgetData.push({ value: budgetRest, label: '', exclude: true })
  staffData.push({ value: staffRest, label: '', exclude: true })

  return { budgetData, budgetTotal, staffData, staffTotal }
}
