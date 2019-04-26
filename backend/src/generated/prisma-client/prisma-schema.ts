// Code generated by Prisma (prisma@1.31.1). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type AggregateNro {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar Long

type Mutation {
  createNro(data: NroCreateInput!): Nro!
  updateNro(data: NroUpdateInput!, where: NroWhereUniqueInput!): Nro
  updateManyNroes(data: NroUpdateManyMutationInput!, where: NroWhereInput): BatchPayload!
  upsertNro(where: NroWhereUniqueInput!, create: NroCreateInput!, update: NroUpdateInput!): Nro!
  deleteNro(where: NroWhereUniqueInput!): Nro
  deleteManyNroes(where: NroWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type Nro {
  id: ID!
  name: String!
  about: String
  incomeGrants: Float
  incomeFundraising: Float
  incomeOther: Float
  expensesCampaigns: Float
  expensesCampaignSupport: Float
  expensesContributions: Float
  expensesOrgSupport: Float
  staffCampaigns: Float
  staffCampaignSupport: Float
  staffFundraising: Float
  staffOrgSupport: Float
}

type NroConnection {
  pageInfo: PageInfo!
  edges: [NroEdge]!
  aggregate: AggregateNro!
}

input NroCreateInput {
  id: ID
  name: String!
  about: String
  incomeGrants: Float
  incomeFundraising: Float
  incomeOther: Float
  expensesCampaigns: Float
  expensesCampaignSupport: Float
  expensesContributions: Float
  expensesOrgSupport: Float
  staffCampaigns: Float
  staffCampaignSupport: Float
  staffFundraising: Float
  staffOrgSupport: Float
}

type NroEdge {
  node: Nro!
  cursor: String!
}

enum NroOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  about_ASC
  about_DESC
  incomeGrants_ASC
  incomeGrants_DESC
  incomeFundraising_ASC
  incomeFundraising_DESC
  incomeOther_ASC
  incomeOther_DESC
  expensesCampaigns_ASC
  expensesCampaigns_DESC
  expensesCampaignSupport_ASC
  expensesCampaignSupport_DESC
  expensesContributions_ASC
  expensesContributions_DESC
  expensesOrgSupport_ASC
  expensesOrgSupport_DESC
  staffCampaigns_ASC
  staffCampaigns_DESC
  staffCampaignSupport_ASC
  staffCampaignSupport_DESC
  staffFundraising_ASC
  staffFundraising_DESC
  staffOrgSupport_ASC
  staffOrgSupport_DESC
}

type NroPreviousValues {
  id: ID!
  name: String!
  about: String
  incomeGrants: Float
  incomeFundraising: Float
  incomeOther: Float
  expensesCampaigns: Float
  expensesCampaignSupport: Float
  expensesContributions: Float
  expensesOrgSupport: Float
  staffCampaigns: Float
  staffCampaignSupport: Float
  staffFundraising: Float
  staffOrgSupport: Float
}

type NroSubscriptionPayload {
  mutation: MutationType!
  node: Nro
  updatedFields: [String!]
  previousValues: NroPreviousValues
}

input NroSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: NroWhereInput
  AND: [NroSubscriptionWhereInput!]
  OR: [NroSubscriptionWhereInput!]
  NOT: [NroSubscriptionWhereInput!]
}

input NroUpdateInput {
  name: String
  about: String
  incomeGrants: Float
  incomeFundraising: Float
  incomeOther: Float
  expensesCampaigns: Float
  expensesCampaignSupport: Float
  expensesContributions: Float
  expensesOrgSupport: Float
  staffCampaigns: Float
  staffCampaignSupport: Float
  staffFundraising: Float
  staffOrgSupport: Float
}

input NroUpdateManyMutationInput {
  name: String
  about: String
  incomeGrants: Float
  incomeFundraising: Float
  incomeOther: Float
  expensesCampaigns: Float
  expensesCampaignSupport: Float
  expensesContributions: Float
  expensesOrgSupport: Float
  staffCampaigns: Float
  staffCampaignSupport: Float
  staffFundraising: Float
  staffOrgSupport: Float
}

input NroWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  about: String
  about_not: String
  about_in: [String!]
  about_not_in: [String!]
  about_lt: String
  about_lte: String
  about_gt: String
  about_gte: String
  about_contains: String
  about_not_contains: String
  about_starts_with: String
  about_not_starts_with: String
  about_ends_with: String
  about_not_ends_with: String
  incomeGrants: Float
  incomeGrants_not: Float
  incomeGrants_in: [Float!]
  incomeGrants_not_in: [Float!]
  incomeGrants_lt: Float
  incomeGrants_lte: Float
  incomeGrants_gt: Float
  incomeGrants_gte: Float
  incomeFundraising: Float
  incomeFundraising_not: Float
  incomeFundraising_in: [Float!]
  incomeFundraising_not_in: [Float!]
  incomeFundraising_lt: Float
  incomeFundraising_lte: Float
  incomeFundraising_gt: Float
  incomeFundraising_gte: Float
  incomeOther: Float
  incomeOther_not: Float
  incomeOther_in: [Float!]
  incomeOther_not_in: [Float!]
  incomeOther_lt: Float
  incomeOther_lte: Float
  incomeOther_gt: Float
  incomeOther_gte: Float
  expensesCampaigns: Float
  expensesCampaigns_not: Float
  expensesCampaigns_in: [Float!]
  expensesCampaigns_not_in: [Float!]
  expensesCampaigns_lt: Float
  expensesCampaigns_lte: Float
  expensesCampaigns_gt: Float
  expensesCampaigns_gte: Float
  expensesCampaignSupport: Float
  expensesCampaignSupport_not: Float
  expensesCampaignSupport_in: [Float!]
  expensesCampaignSupport_not_in: [Float!]
  expensesCampaignSupport_lt: Float
  expensesCampaignSupport_lte: Float
  expensesCampaignSupport_gt: Float
  expensesCampaignSupport_gte: Float
  expensesContributions: Float
  expensesContributions_not: Float
  expensesContributions_in: [Float!]
  expensesContributions_not_in: [Float!]
  expensesContributions_lt: Float
  expensesContributions_lte: Float
  expensesContributions_gt: Float
  expensesContributions_gte: Float
  expensesOrgSupport: Float
  expensesOrgSupport_not: Float
  expensesOrgSupport_in: [Float!]
  expensesOrgSupport_not_in: [Float!]
  expensesOrgSupport_lt: Float
  expensesOrgSupport_lte: Float
  expensesOrgSupport_gt: Float
  expensesOrgSupport_gte: Float
  staffCampaigns: Float
  staffCampaigns_not: Float
  staffCampaigns_in: [Float!]
  staffCampaigns_not_in: [Float!]
  staffCampaigns_lt: Float
  staffCampaigns_lte: Float
  staffCampaigns_gt: Float
  staffCampaigns_gte: Float
  staffCampaignSupport: Float
  staffCampaignSupport_not: Float
  staffCampaignSupport_in: [Float!]
  staffCampaignSupport_not_in: [Float!]
  staffCampaignSupport_lt: Float
  staffCampaignSupport_lte: Float
  staffCampaignSupport_gt: Float
  staffCampaignSupport_gte: Float
  staffFundraising: Float
  staffFundraising_not: Float
  staffFundraising_in: [Float!]
  staffFundraising_not_in: [Float!]
  staffFundraising_lt: Float
  staffFundraising_lte: Float
  staffFundraising_gt: Float
  staffFundraising_gte: Float
  staffOrgSupport: Float
  staffOrgSupport_not: Float
  staffOrgSupport_in: [Float!]
  staffOrgSupport_not_in: [Float!]
  staffOrgSupport_lt: Float
  staffOrgSupport_lte: Float
  staffOrgSupport_gt: Float
  staffOrgSupport_gte: Float
  AND: [NroWhereInput!]
  OR: [NroWhereInput!]
  NOT: [NroWhereInput!]
}

input NroWhereUniqueInput {
  id: ID
  name: String
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  nro(where: NroWhereUniqueInput!): Nro
  nroes(where: NroWhereInput, orderBy: NroOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Nro]!
  nroesConnection(where: NroWhereInput, orderBy: NroOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): NroConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  nro(where: NroSubscriptionWhereInput): NroSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  email: String!
  password: String!
  name: String!
  isAdmin: Boolean!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  email: String!
  password: String!
  name: String!
  isAdmin: Boolean!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  name_ASC
  name_DESC
  isAdmin_ASC
  isAdmin_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String!
  name: String!
  isAdmin: Boolean!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  email: String
  password: String
  name: String
  isAdmin: Boolean
}

input UserUpdateManyMutationInput {
  email: String
  password: String
  name: String
  isAdmin: Boolean
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  isAdmin: Boolean
  isAdmin_not: Boolean
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`