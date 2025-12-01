import { lazyImport } from '@/utils/lazyImports';
import { Outlet, RouteObject } from 'react-router-dom';
import Layout from '../components/Layout';
import { RouteError } from '@/components/error/ErrorElement';

const { Verifier } = lazyImport(
  () => import('../components/Verifier'),
  'Verifier'
);

export const VerifierRouteList: RouteObject[] = [
  {
    path: 'verifier-dashboard',
    element: <Verifier />,
  },
];
const VerifierPagesRouteOutlet = (
  <Layout>
    <Outlet />
  </Layout>
);
export const VerifierRoutes: RouteObject = {
  path: '',
  element: VerifierPagesRouteOutlet,
  errorElement: <RouteError />,
  children: VerifierRouteList,
};
