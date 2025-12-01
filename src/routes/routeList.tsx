import { LogoLoader } from '@/components/elements/loader/Loader';
import { RouteError } from '@/components/error/ErrorElement';
import { AuthRoutes } from '@/features/auth/routes';
import { LandingPageRoutes } from '@/features/dashboard/routes';
import { VerifierRoutes } from '@/features/verifier/routes';
import { Box } from '@chakra-ui/react';
import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

export const RoutesList: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense
        fallback={
          <Box h={'100vh'}>
            <LogoLoader text="Loading..." />
          </Box>
        }
      >
        <Outlet />
      </Suspense>
    ),
    errorElement: <RouteError />,
    children: [LandingPageRoutes, AuthRoutes, VerifierRoutes],
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  },
];
