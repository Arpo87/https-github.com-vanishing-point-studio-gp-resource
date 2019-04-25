// Code generated by Prisma (prisma@1.31.1). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export interface Exists {
  nro: (where?: NroWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  nro: (where: NroWhereUniqueInput) => NroPromise;
  nroes: (args?: {
    where?: NroWhereInput;
    orderBy?: NroOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Nro>;
  nroesConnection: (args?: {
    where?: NroWhereInput;
    orderBy?: NroOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => NroConnectionPromise;
  user: (where: UserWhereUniqueInput) => UserPromise;
  users: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<User>;
  usersConnection: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => UserConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createNro: (data: NroCreateInput) => NroPromise;
  updateNro: (args: {
    data: NroUpdateInput;
    where: NroWhereUniqueInput;
  }) => NroPromise;
  updateManyNroes: (args: {
    data: NroUpdateManyMutationInput;
    where?: NroWhereInput;
  }) => BatchPayloadPromise;
  upsertNro: (args: {
    where: NroWhereUniqueInput;
    create: NroCreateInput;
    update: NroUpdateInput;
  }) => NroPromise;
  deleteNro: (where: NroWhereUniqueInput) => NroPromise;
  deleteManyNroes: (where?: NroWhereInput) => BatchPayloadPromise;
  createUser: (data: UserCreateInput) => UserPromise;
  updateUser: (args: {
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
  }) => UserPromise;
  updateManyUsers: (args: {
    data: UserUpdateManyMutationInput;
    where?: UserWhereInput;
  }) => BatchPayloadPromise;
  upsertUser: (args: {
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
  }) => UserPromise;
  deleteUser: (where: UserWhereUniqueInput) => UserPromise;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  nro: (
    where?: NroSubscriptionWhereInput
  ) => NroSubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type NroOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "name_ASC"
  | "name_DESC"
  | "about_ASC"
  | "about_DESC"
  | "incomeGrants_ASC"
  | "incomeGrants_DESC"
  | "incomeFundraising_ASC"
  | "incomeFundraising_DESC"
  | "incomeOther_ASC"
  | "incomeOther_DESC"
  | "expensesCampaigns_ASC"
  | "expensesCampaigns_DESC"
  | "expensesCampaignSupport_ASC"
  | "expensesCampaignSupport_DESC"
  | "expensesContributions_ASC"
  | "expensesContributions_DESC"
  | "expensesOrgSupport_ASC"
  | "expensesOrgSupport_DESC"
  | "staffCampaigns_ASC"
  | "staffCampaigns_DESC"
  | "staffCampaignSupport_ASC"
  | "staffCampaignSupport_DESC"
  | "staffFundraising_ASC"
  | "staffFundraising_DESC"
  | "staffOrgSupport_ASC"
  | "staffOrgSupport_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export type UserOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "email_ASC"
  | "email_DESC"
  | "password_ASC"
  | "password_DESC"
  | "name_ASC"
  | "name_DESC"
  | "isAdmin_ASC"
  | "isAdmin_DESC";

export interface UserCreateInput {
  id?: ID_Input;
  email: String;
  password: String;
  name: String;
  isAdmin: Boolean;
}

export interface NroUpdateInput {
  name?: String;
  about?: String;
  incomeGrants?: Float;
  incomeFundraising?: Float;
  incomeOther?: Float;
  expensesCampaigns?: Float;
  expensesCampaignSupport?: Float;
  expensesContributions?: Float;
  expensesOrgSupport?: Float;
  staffCampaigns?: Int;
  staffCampaignSupport?: Int;
  staffFundraising?: Int;
  staffOrgSupport?: Int;
}

export type NroWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
  name?: String;
}>;

export interface UserUpdateManyMutationInput {
  email?: String;
  password?: String;
  name?: String;
  isAdmin?: Boolean;
}

export interface UserWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  email?: String;
  email_not?: String;
  email_in?: String[] | String;
  email_not_in?: String[] | String;
  email_lt?: String;
  email_lte?: String;
  email_gt?: String;
  email_gte?: String;
  email_contains?: String;
  email_not_contains?: String;
  email_starts_with?: String;
  email_not_starts_with?: String;
  email_ends_with?: String;
  email_not_ends_with?: String;
  password?: String;
  password_not?: String;
  password_in?: String[] | String;
  password_not_in?: String[] | String;
  password_lt?: String;
  password_lte?: String;
  password_gt?: String;
  password_gte?: String;
  password_contains?: String;
  password_not_contains?: String;
  password_starts_with?: String;
  password_not_starts_with?: String;
  password_ends_with?: String;
  password_not_ends_with?: String;
  name?: String;
  name_not?: String;
  name_in?: String[] | String;
  name_not_in?: String[] | String;
  name_lt?: String;
  name_lte?: String;
  name_gt?: String;
  name_gte?: String;
  name_contains?: String;
  name_not_contains?: String;
  name_starts_with?: String;
  name_not_starts_with?: String;
  name_ends_with?: String;
  name_not_ends_with?: String;
  isAdmin?: Boolean;
  isAdmin_not?: Boolean;
  AND?: UserWhereInput[] | UserWhereInput;
  OR?: UserWhereInput[] | UserWhereInput;
  NOT?: UserWhereInput[] | UserWhereInput;
}

export type UserWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
  email?: String;
}>;

export interface NroCreateInput {
  id?: ID_Input;
  name: String;
  about?: String;
  incomeGrants?: Float;
  incomeFundraising?: Float;
  incomeOther?: Float;
  expensesCampaigns?: Float;
  expensesCampaignSupport?: Float;
  expensesContributions?: Float;
  expensesOrgSupport?: Float;
  staffCampaigns?: Int;
  staffCampaignSupport?: Int;
  staffFundraising?: Int;
  staffOrgSupport?: Int;
}

export interface NroWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  name?: String;
  name_not?: String;
  name_in?: String[] | String;
  name_not_in?: String[] | String;
  name_lt?: String;
  name_lte?: String;
  name_gt?: String;
  name_gte?: String;
  name_contains?: String;
  name_not_contains?: String;
  name_starts_with?: String;
  name_not_starts_with?: String;
  name_ends_with?: String;
  name_not_ends_with?: String;
  about?: String;
  about_not?: String;
  about_in?: String[] | String;
  about_not_in?: String[] | String;
  about_lt?: String;
  about_lte?: String;
  about_gt?: String;
  about_gte?: String;
  about_contains?: String;
  about_not_contains?: String;
  about_starts_with?: String;
  about_not_starts_with?: String;
  about_ends_with?: String;
  about_not_ends_with?: String;
  incomeGrants?: Float;
  incomeGrants_not?: Float;
  incomeGrants_in?: Float[] | Float;
  incomeGrants_not_in?: Float[] | Float;
  incomeGrants_lt?: Float;
  incomeGrants_lte?: Float;
  incomeGrants_gt?: Float;
  incomeGrants_gte?: Float;
  incomeFundraising?: Float;
  incomeFundraising_not?: Float;
  incomeFundraising_in?: Float[] | Float;
  incomeFundraising_not_in?: Float[] | Float;
  incomeFundraising_lt?: Float;
  incomeFundraising_lte?: Float;
  incomeFundraising_gt?: Float;
  incomeFundraising_gte?: Float;
  incomeOther?: Float;
  incomeOther_not?: Float;
  incomeOther_in?: Float[] | Float;
  incomeOther_not_in?: Float[] | Float;
  incomeOther_lt?: Float;
  incomeOther_lte?: Float;
  incomeOther_gt?: Float;
  incomeOther_gte?: Float;
  expensesCampaigns?: Float;
  expensesCampaigns_not?: Float;
  expensesCampaigns_in?: Float[] | Float;
  expensesCampaigns_not_in?: Float[] | Float;
  expensesCampaigns_lt?: Float;
  expensesCampaigns_lte?: Float;
  expensesCampaigns_gt?: Float;
  expensesCampaigns_gte?: Float;
  expensesCampaignSupport?: Float;
  expensesCampaignSupport_not?: Float;
  expensesCampaignSupport_in?: Float[] | Float;
  expensesCampaignSupport_not_in?: Float[] | Float;
  expensesCampaignSupport_lt?: Float;
  expensesCampaignSupport_lte?: Float;
  expensesCampaignSupport_gt?: Float;
  expensesCampaignSupport_gte?: Float;
  expensesContributions?: Float;
  expensesContributions_not?: Float;
  expensesContributions_in?: Float[] | Float;
  expensesContributions_not_in?: Float[] | Float;
  expensesContributions_lt?: Float;
  expensesContributions_lte?: Float;
  expensesContributions_gt?: Float;
  expensesContributions_gte?: Float;
  expensesOrgSupport?: Float;
  expensesOrgSupport_not?: Float;
  expensesOrgSupport_in?: Float[] | Float;
  expensesOrgSupport_not_in?: Float[] | Float;
  expensesOrgSupport_lt?: Float;
  expensesOrgSupport_lte?: Float;
  expensesOrgSupport_gt?: Float;
  expensesOrgSupport_gte?: Float;
  staffCampaigns?: Int;
  staffCampaigns_not?: Int;
  staffCampaigns_in?: Int[] | Int;
  staffCampaigns_not_in?: Int[] | Int;
  staffCampaigns_lt?: Int;
  staffCampaigns_lte?: Int;
  staffCampaigns_gt?: Int;
  staffCampaigns_gte?: Int;
  staffCampaignSupport?: Int;
  staffCampaignSupport_not?: Int;
  staffCampaignSupport_in?: Int[] | Int;
  staffCampaignSupport_not_in?: Int[] | Int;
  staffCampaignSupport_lt?: Int;
  staffCampaignSupport_lte?: Int;
  staffCampaignSupport_gt?: Int;
  staffCampaignSupport_gte?: Int;
  staffFundraising?: Int;
  staffFundraising_not?: Int;
  staffFundraising_in?: Int[] | Int;
  staffFundraising_not_in?: Int[] | Int;
  staffFundraising_lt?: Int;
  staffFundraising_lte?: Int;
  staffFundraising_gt?: Int;
  staffFundraising_gte?: Int;
  staffOrgSupport?: Int;
  staffOrgSupport_not?: Int;
  staffOrgSupport_in?: Int[] | Int;
  staffOrgSupport_not_in?: Int[] | Int;
  staffOrgSupport_lt?: Int;
  staffOrgSupport_lte?: Int;
  staffOrgSupport_gt?: Int;
  staffOrgSupport_gte?: Int;
  AND?: NroWhereInput[] | NroWhereInput;
  OR?: NroWhereInput[] | NroWhereInput;
  NOT?: NroWhereInput[] | NroWhereInput;
}

export interface NroUpdateManyMutationInput {
  name?: String;
  about?: String;
  incomeGrants?: Float;
  incomeFundraising?: Float;
  incomeOther?: Float;
  expensesCampaigns?: Float;
  expensesCampaignSupport?: Float;
  expensesContributions?: Float;
  expensesOrgSupport?: Float;
  staffCampaigns?: Int;
  staffCampaignSupport?: Int;
  staffFundraising?: Int;
  staffOrgSupport?: Int;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: UserWhereInput;
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
}

export interface UserUpdateInput {
  email?: String;
  password?: String;
  name?: String;
  isAdmin?: Boolean;
}

export interface NroSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: NroWhereInput;
  AND?: NroSubscriptionWhereInput[] | NroSubscriptionWhereInput;
  OR?: NroSubscriptionWhereInput[] | NroSubscriptionWhereInput;
  NOT?: NroSubscriptionWhereInput[] | NroSubscriptionWhereInput;
}

export interface NodeNode {
  id: ID_Output;
}

export interface UserEdge {
  node: User;
  cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
  node: <T = UserPromise>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdge>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface UserPreviousValues {
  id: ID_Output;
  email: String;
  password: String;
  name: String;
  isAdmin: Boolean;
}

export interface UserPreviousValuesPromise
  extends Promise<UserPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  email: () => Promise<String>;
  password: () => Promise<String>;
  name: () => Promise<String>;
  isAdmin: () => Promise<Boolean>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  email: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  name: () => Promise<AsyncIterator<String>>;
  isAdmin: () => Promise<AsyncIterator<Boolean>>;
}

export interface NroConnection {
  pageInfo: PageInfo;
  edges: NroEdge[];
}

export interface NroConnectionPromise
  extends Promise<NroConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<NroEdge>>() => T;
  aggregate: <T = AggregateNroPromise>() => T;
}

export interface NroConnectionSubscription
  extends Promise<AsyncIterator<NroConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<NroEdgeSubscription>>>() => T;
  aggregate: <T = AggregateNroSubscription>() => T;
}

export interface UserConnection {
  pageInfo: PageInfo;
  edges: UserEdge[];
}

export interface UserConnectionPromise
  extends Promise<UserConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<UserEdge>>() => T;
  aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

export interface AggregateUser {
  count: Int;
}

export interface AggregateUserPromise
  extends Promise<AggregateUser>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUser>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface AggregateNro {
  count: Int;
}

export interface AggregateNroPromise
  extends Promise<AggregateNro>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateNroSubscription
  extends Promise<AsyncIterator<AggregateNro>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface NroSubscriptionPayload {
  mutation: MutationType;
  node: Nro;
  updatedFields: String[];
  previousValues: NroPreviousValues;
}

export interface NroSubscriptionPayloadPromise
  extends Promise<NroSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = NroPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = NroPreviousValuesPromise>() => T;
}

export interface NroSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<NroSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = NroSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = NroPreviousValuesSubscription>() => T;
}

export interface Nro {
  id: ID_Output;
  name: String;
  about?: String;
  incomeGrants?: Float;
  incomeFundraising?: Float;
  incomeOther?: Float;
  expensesCampaigns?: Float;
  expensesCampaignSupport?: Float;
  expensesContributions?: Float;
  expensesOrgSupport?: Float;
  staffCampaigns?: Int;
  staffCampaignSupport?: Int;
  staffFundraising?: Int;
  staffOrgSupport?: Int;
}

export interface NroPromise extends Promise<Nro>, Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  about: () => Promise<String>;
  incomeGrants: () => Promise<Float>;
  incomeFundraising: () => Promise<Float>;
  incomeOther: () => Promise<Float>;
  expensesCampaigns: () => Promise<Float>;
  expensesCampaignSupport: () => Promise<Float>;
  expensesContributions: () => Promise<Float>;
  expensesOrgSupport: () => Promise<Float>;
  staffCampaigns: () => Promise<Int>;
  staffCampaignSupport: () => Promise<Int>;
  staffFundraising: () => Promise<Int>;
  staffOrgSupport: () => Promise<Int>;
}

export interface NroSubscription
  extends Promise<AsyncIterator<Nro>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  about: () => Promise<AsyncIterator<String>>;
  incomeGrants: () => Promise<AsyncIterator<Float>>;
  incomeFundraising: () => Promise<AsyncIterator<Float>>;
  incomeOther: () => Promise<AsyncIterator<Float>>;
  expensesCampaigns: () => Promise<AsyncIterator<Float>>;
  expensesCampaignSupport: () => Promise<AsyncIterator<Float>>;
  expensesContributions: () => Promise<AsyncIterator<Float>>;
  expensesOrgSupport: () => Promise<AsyncIterator<Float>>;
  staffCampaigns: () => Promise<AsyncIterator<Int>>;
  staffCampaignSupport: () => Promise<AsyncIterator<Int>>;
  staffFundraising: () => Promise<AsyncIterator<Int>>;
  staffOrgSupport: () => Promise<AsyncIterator<Int>>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface NroEdge {
  node: Nro;
  cursor: String;
}

export interface NroEdgePromise extends Promise<NroEdge>, Fragmentable {
  node: <T = NroPromise>() => T;
  cursor: () => Promise<String>;
}

export interface NroEdgeSubscription
  extends Promise<AsyncIterator<NroEdge>>,
    Fragmentable {
  node: <T = NroSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface User {
  id: ID_Output;
  email: String;
  password: String;
  name: String;
  isAdmin: Boolean;
}

export interface UserPromise extends Promise<User>, Fragmentable {
  id: () => Promise<ID_Output>;
  email: () => Promise<String>;
  password: () => Promise<String>;
  name: () => Promise<String>;
  isAdmin: () => Promise<Boolean>;
}

export interface UserSubscription
  extends Promise<AsyncIterator<User>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  email: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  name: () => Promise<AsyncIterator<String>>;
  isAdmin: () => Promise<AsyncIterator<Boolean>>;
}

export interface NroPreviousValues {
  id: ID_Output;
  name: String;
  about?: String;
  incomeGrants?: Float;
  incomeFundraising?: Float;
  incomeOther?: Float;
  expensesCampaigns?: Float;
  expensesCampaignSupport?: Float;
  expensesContributions?: Float;
  expensesOrgSupport?: Float;
  staffCampaigns?: Int;
  staffCampaignSupport?: Int;
  staffFundraising?: Int;
  staffOrgSupport?: Int;
}

export interface NroPreviousValuesPromise
  extends Promise<NroPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  about: () => Promise<String>;
  incomeGrants: () => Promise<Float>;
  incomeFundraising: () => Promise<Float>;
  incomeOther: () => Promise<Float>;
  expensesCampaigns: () => Promise<Float>;
  expensesCampaignSupport: () => Promise<Float>;
  expensesContributions: () => Promise<Float>;
  expensesOrgSupport: () => Promise<Float>;
  staffCampaigns: () => Promise<Int>;
  staffCampaignSupport: () => Promise<Int>;
  staffFundraising: () => Promise<Int>;
  staffOrgSupport: () => Promise<Int>;
}

export interface NroPreviousValuesSubscription
  extends Promise<AsyncIterator<NroPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  about: () => Promise<AsyncIterator<String>>;
  incomeGrants: () => Promise<AsyncIterator<Float>>;
  incomeFundraising: () => Promise<AsyncIterator<Float>>;
  incomeOther: () => Promise<AsyncIterator<Float>>;
  expensesCampaigns: () => Promise<AsyncIterator<Float>>;
  expensesCampaignSupport: () => Promise<AsyncIterator<Float>>;
  expensesContributions: () => Promise<AsyncIterator<Float>>;
  expensesOrgSupport: () => Promise<AsyncIterator<Float>>;
  staffCampaigns: () => Promise<AsyncIterator<Int>>;
  staffCampaignSupport: () => Promise<AsyncIterator<Int>>;
  staffFundraising: () => Promise<AsyncIterator<Int>>;
  staffOrgSupport: () => Promise<AsyncIterator<Int>>;
}

export interface UserSubscriptionPayload {
  mutation: MutationType;
  node: User;
  updatedFields: String[];
  previousValues: UserPreviousValues;
}

export interface UserSubscriptionPayloadPromise
  extends Promise<UserSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = UserPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). 
*/
export type Float = number;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

export type Long = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Nro",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const Prisma = makePrismaClientClass<ClientConstructor<Prisma>>({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
export const prisma = new Prisma();
