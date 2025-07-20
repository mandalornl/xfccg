export const useRouteFromState = () => (
  useState('routeFrom', () => shallowRef({
    name: undefined,
    path: '/',
    query: {},
    hash: '',
    fullPath: '/',
    params: {}
  }))
);