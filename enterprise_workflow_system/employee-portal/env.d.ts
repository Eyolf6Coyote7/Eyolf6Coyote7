/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MOCK: string
  readonly VITE_API_URL: string
  readonly VITE_GRAPHQL_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
