import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useGetAllServicesApi } from '../api/get-all-services';
import { CreateVerificationState } from '../store/verifications/create-verification';

export const useReviewHook = () => {
  const { candidate, verifications } = useRecoilValue(CreateVerificationState);
  const { data } = useGetAllServicesApi();
  const address = verifications?.address;
  const identity = verifications?.identity;
  const fullAddress = useMemo(() => {
    if (!address) return '';
    return `${address.buildingNumber}, ${address.street}, ${address.landmark}, ${address.lga}, ${address.state}, ${address.country}`;
  }, [address]);

  const addressPrice = useMemo(() => {
    if (!address) return 0;
    return (
      data?.data?.find((item) => item?.slug?.toLowerCase() === 'address')
        ?.price || 0
    );
  }, [data]);

  const identityPrice = useMemo(() => {
    if (!identity) return 0;
    return (
      data?.data?.find(
        (item) => item?.slug?.toLowerCase() === identity.type.toLowerCase()
      )?.price || 0
    );
  }, [data, identity]);

  const totalPrice = useMemo(() => {
    return Number(addressPrice) + Number(identityPrice);
  }, [addressPrice, identityPrice]);

  return {
    fullAddress,
    candidate,
    totalPrice,
    identityPrice,
    addressPrice,
    identity,
    verifications,
    address,
  };
};
