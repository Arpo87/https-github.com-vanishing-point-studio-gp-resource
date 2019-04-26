import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from 'apollo-boost'

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    })
  }
  return forward(operation)
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
