import { gql } from 'apollo-boost'

export const meQuery = gql`
  {
    me {
      name
      email
      isAdmin
    }
  }
`

export const nroQuery = gql`
  {
    nros {
      name
      about
      incomeGrants
      incomeFundraising
      incomeOther
      expensesCampaigns
      expensesCampaignSupport
      expensesContributions
      expensesOrgSupport
      staffCampaigns
      staffCampaignSupport
      staffFundraising
      staffOrgSupport
      programmeStaffCampaigns
      programmeStaffCampaignCoordination
      programmeStaffCampaignUnallocated
      programmeStaffMediaComms
      programmeStaffPublicInfoOutreach
      programmeStaffOperations
      programmeStaffEngagement
      programmeStaffPolitical
      programmeBudgetCampaigns
      programmeBudgetCampaignCoordination
      programmeBudgetCampaignUnallocated
      programmeBudgetMediaComms
      programmeBudgetPublicInfoOutreach
      programmeBudgetOperations
      programmeBudgetEngagement
      programmeBudgetPolitical
      programmeBalanceStaff
      programmeBalanceDirect
    }
  }
`

export const projectQuery = gql`
  {
    projectsList {
      name
    }
  }
`
