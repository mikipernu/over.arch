/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AWS_USER_POOL_ID: string;
  readonly VITE_AWS_USER_POOL_CLIENT_ID: string;
  readonly VITE_AWS_WEBSOCKET_URL: string;
  readonly VITE_AWS_WEBSOCKET_CONNECTIONS_URL: string;
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
