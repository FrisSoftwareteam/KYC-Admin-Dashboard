import { useGoogleLogin } from '@react-oauth/google';
import { useToast } from '@/hooks/useToast';
import { useGoogleLoginUserApi } from '../api/login';

const isConfigured = Boolean(import.meta.env.VITE_APP_GOOGLE_CLIENT_ID);

export const useGoogleSignIn = () => {
  const toast = useToast();
  const { mutateAsync, isLoading } = useGoogleLoginUserApi();

  const openGooglePopup = useGoogleLogin({
    flow: 'implicit',
    scope: 'openid email profile',
    onSuccess: async (tokenResponse) => {
      await mutateAsync(tokenResponse.access_token).catch(() => undefined);
    },
    onError: () => {
      toast({
        status: 'error',
        description: 'Google sign-in was cancelled or failed.',
      });
    },
  });

  const signInWithGoogle = () => {
    if (!isConfigured) {
      toast({
        status: 'error',
        description: 'Google sign-in is not set up yet.',
      });
      return;
    }
    openGooglePopup();
  };

  return { signInWithGoogle, isGoogleLoading: isLoading };
};
