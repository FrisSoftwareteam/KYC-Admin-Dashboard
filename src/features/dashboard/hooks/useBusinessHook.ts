import { useGetAllBusinessesApi } from '../api/business/get-all-businesses';

export const useBusinessHook = () => {
  const { data, isLoading } = useGetAllBusinessesApi();
  //   console.log('Data is ', data);

  return {
    data,
    isLoading,
  };
};
