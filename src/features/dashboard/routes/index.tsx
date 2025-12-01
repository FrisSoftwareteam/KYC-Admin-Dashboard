import { RouteError } from '@/components/error/ErrorElement';
import { lazyImport } from '@/utils/lazyImports';
import { Outlet, RouteObject } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { AddressDetails } from '../components/addresses/verification-details/AddressDetails';
const { Home } = lazyImport(() => import('../components/home/Home'), 'Home');
const { Candidates } = lazyImport(
  () => import('../components/candidates/Candidates'),
  'Candidates'
);
const { Settings } = lazyImport(
  () => import('../components/settings/Settings'),
  'Settings'
);
const { Users } = lazyImport(
  () => import('../components/users/Users'),
  'Users'
);
const { Verifications } = lazyImport(
  () => import('../components/verifications/Verifications'),
  'Verifications'
);
// const { Verifications } = lazyImport(
//   () => import('../components/verifications/Verifications'),
//   'Verifications'
// );
const { Businesses } = lazyImport(
  () => import('../components/businesses/Businesses'),
  'Businesses'
);
const { Businessesdetails } = lazyImport(
  () => import('../components/businesses/businessesdetails/Businessesdetails'),
  'Businessesdetails'
);
const { EditBusiness } = lazyImport(
  () => import('../components/businesses/edit-business/EditBusiness'),
  'EditBusiness'
);
const { AddBusiness } = lazyImport(
  () => import('../components/businesses/add-business/AddBusiness'),
  'AddBusiness'
);
const { Partner } = lazyImport(
  () => import('../components/partner/Partner'),
  'Partner'
);
const { PartnerDetails } = lazyImport(
  () => import('../components/partner/partnerdetails/PartnerDetails'),
  'PartnerDetails'
);
const { EditPartner } = lazyImport(
  () => import('../components/partner/partnerdetails/edit-partner/EditPartner'),
  'EditPartner'
);
const { InvitePartner } = lazyImport(
  () => import('../components/partner/invite-partner/InvitePartner'),
  'InvitePartner'
);
const { Transaction } = lazyImport(
  () => import('../components/transaction/Transaction'),
  'Transaction'
);
const { Candidate } = lazyImport(
  () => import('../components/candidates/view/Candidate'),
  'Candidate'
);
const { AgentById } = lazyImport(
  () => import('../components/agent/view-by-id/AgentById'),
  'AgentById'
);
const { VerificationDetails } = lazyImport(
  () =>
    import(
      '../components/verifications/verification-details/VerificationDetails'
    ),
  'VerificationDetails'
);
const { Addresses } = lazyImport(
  () => import('../components/addresses/Addresses'),
  'Addresses'
);
const { Modules } = lazyImport(
  () => import('../components/other-modules/Modules'),
  'Modules'
);
// const { AddVerification } = lazyImport(
//   () => import('../components/verifications/addverification/AddVerification'),
//   'AddVerification'
// );

export const LandingPageRouteList: RouteObject[] = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: 'candidates',
    element: <Candidates />,
  },
  {
    path: 'transactions',
    element: <Transaction />,
  },
  {
    path: 'settings',
    element: <Settings />,
  },
  {
    path: 'users',
    element: <Users />,
  },
  {
    path: 'verifications',
    element: <Verifications />,
  },
  {
    path: 'business',
    element: <Businesses />,
  },
  {
    path: 'business/:id',
    element: <Businessesdetails />,
  },
  {
    path: 'business/:id/edit',
    element: <EditBusiness />,
  },
  {
    path: 'business/add',
    element: <AddBusiness />,
  },
  {
    path: 'partner',
    element: <Partner />,
  },
  {
    path: 'partner/:id',
    element: <PartnerDetails />,
  },
  {
    path: 'partner/:id/edit',
    element: <EditPartner />,
  },
  {
    path: 'partner/invite',
    element: <InvitePartner />,
  },
  // {
  //   path: 'verifications/add',
  //   element: <AddVerification />,
  // },
  {
    path: 'verifications/:id',
    element: <VerificationDetails />,
  },
  {
    path: 'candidates',
    element: <Candidates />,
  },
  {
    path: 'candidates/:id',
    element: <Candidate />,
  },
  {
    path: 'partner/:partnerId/agent/:agentId',
    element: <AgentById />,
  },
  {
    path: 'addresses',
    element: <Addresses />,
  },
  {
    path: 'addresses/:id',
    element: <AddressDetails />,
  },
  {
    path: 'modules',
    element: <Modules />,
  },
];

const LandingPageRouteOutlet = (
  <Layout>
    <Outlet />
  </Layout>
);
export const LandingPageRoutes: RouteObject = {
  path: '',
  element: LandingPageRouteOutlet,
  errorElement: <RouteError />,
  children: LandingPageRouteList,
};
