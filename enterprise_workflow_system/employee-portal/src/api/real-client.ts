import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000/graphql',
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

// TODO: implement real GraphQL queries
export const realClient = {
  async getRequests() {
    throw new Error('Real client not yet implemented. Set VITE_MOCK=true.')
  },
  async getRequestById(_id: string) {
    throw new Error('Real client not yet implemented.')
  },
  async getPendingApprovals() {
    throw new Error('Real client not yet implemented.')
  },
  async getStats() {
    throw new Error('Real client not yet implemented.')
  },
  async approveRequest(_id: string) {
    throw new Error('Real client not yet implemented.')
  },
  async rejectRequest(_id: string) {
    throw new Error('Real client not yet implemented.')
  },
}
