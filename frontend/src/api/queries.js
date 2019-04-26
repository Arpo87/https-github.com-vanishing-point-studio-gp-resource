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
