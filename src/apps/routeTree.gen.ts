/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PubImport } from './routes/_pub'
import { Route as AuthImport } from './routes/_auth'

// Create Virtual Routes

const PubIndexLazyImport = createFileRoute('/_pub/')()
const PubLoginIndexLazyImport = createFileRoute('/_pub/login/')()
const AuthChatIndexLazyImport = createFileRoute('/_auth/chat/')()
const AuthChatChatIdLazyImport = createFileRoute('/_auth/chat/$chatId')()

// Create/Update Routes

const PubRoute = PubImport.update({
  id: '/_pub',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const PubIndexLazyRoute = PubIndexLazyImport.update({
  path: '/',
  getParentRoute: () => PubRoute,
} as any).lazy(() => import('./routes/_pub.index.lazy').then((d) => d.Route))

const PubLoginIndexLazyRoute = PubLoginIndexLazyImport.update({
  path: '/login/',
  getParentRoute: () => PubRoute,
} as any).lazy(() =>
  import('./routes/_pub.login.index.lazy').then((d) => d.Route),
)

const AuthChatIndexLazyRoute = AuthChatIndexLazyImport.update({
  path: '/chat/',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth.chat.index.lazy').then((d) => d.Route),
)

const AuthChatChatIdLazyRoute = AuthChatChatIdLazyImport.update({
  path: '/chat/$chatId',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth.chat.$chatId.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_pub': {
      id: '/_pub'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PubImport
      parentRoute: typeof rootRoute
    }
    '/_pub/': {
      id: '/_pub/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof PubIndexLazyImport
      parentRoute: typeof PubImport
    }
    '/_auth/chat/$chatId': {
      id: '/_auth/chat/$chatId'
      path: '/chat/$chatId'
      fullPath: '/chat/$chatId'
      preLoaderRoute: typeof AuthChatChatIdLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/chat/': {
      id: '/_auth/chat/'
      path: '/chat'
      fullPath: '/chat'
      preLoaderRoute: typeof AuthChatIndexLazyImport
      parentRoute: typeof AuthImport
    }
    '/_pub/login/': {
      id: '/_pub/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof PubLoginIndexLazyImport
      parentRoute: typeof PubImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AuthRoute: AuthRoute.addChildren({
    AuthChatChatIdLazyRoute,
    AuthChatIndexLazyRoute,
  }),
  PubRoute: PubRoute.addChildren({ PubIndexLazyRoute, PubLoginIndexLazyRoute }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/_pub"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/chat/$chatId",
        "/_auth/chat/"
      ]
    },
    "/_pub": {
      "filePath": "_pub.tsx",
      "children": [
        "/_pub/",
        "/_pub/login/"
      ]
    },
    "/_pub/": {
      "filePath": "_pub.index.lazy.tsx",
      "parent": "/_pub"
    },
    "/_auth/chat/$chatId": {
      "filePath": "_auth.chat.$chatId.lazy.tsx",
      "parent": "/_auth"
    },
    "/_auth/chat/": {
      "filePath": "_auth.chat.index.lazy.tsx",
      "parent": "/_auth"
    },
    "/_pub/login/": {
      "filePath": "_pub.login.index.lazy.tsx",
      "parent": "/_pub"
    }
  }
}
ROUTE_MANIFEST_END */
