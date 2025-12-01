import { stateOptions } from '@/data/options/state';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPartnerByIdApi } from '../api/partner/get-partner-by-id';
import { useEditPartnerApi } from '../api/partner/edit-partner';

interface IState {
  name: string;
  partner: string | number;
  agent: string | number;
}

export const useManagePartnerFinancesHook = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const { id } = useParams();
  const { data: partner, refetch } = useGetPartnerByIdApi(id as string, {
    enabled: Boolean(id),
  });

  const agentEntries = Object.entries(
    partner?.data?.prices?.address?.agent || {}
  );
  const partnerEntries = Object.entries(
    partner?.data?.prices?.address?.partner || {}
  );
  const partnerLookup = Object.fromEntries(partnerEntries);

  const preState = agentEntries?.map(([name, agentValue]) => ({
    name,
    agent: agentValue,
    partner: partnerLookup[name] || 0,
  }));

  const [state, setState] = useState<Array<IState>>(preState);
  const [selectedOption, setSelectedOption] = useState('');

  const { mutateAsync, isLoading } = useEditPartnerApi();

  const updatedStateOptions = [
    ...stateOptions,
    { label: 'Others', value: 'others' },
  ];

  const handleChange = (props: string | number, key: string) => {
    setState((prev: any) => {
      const newValue = Number(props);
      const existingItemIndex = prev.findIndex(
        (item) => item.name === selectedOption
      );

      if (existingItemIndex === -1) {
        return [...prev, { name: selectedOption, [key]: newValue }];
      } else {
        return prev.map((item, index) =>
          index === existingItemIndex ? { ...item, [key]: newValue } : item
        );
      }
    });
  };

  const handleRemove = (props: string) => {
    setState((prev) => {
      return prev.filter((item) => item.name !== props);
    });
  };

  const handleSubmit = async () => {
    const partnerPrices = state.reduce((acc, item) => {
      acc[item.name] = item.partner;
      return acc;
    }, {});
    const agentPrices = state.reduce((acc, item) => {
      acc[item.name] = item.agent;
      return acc;
    }, {});

    const payload = {
      partnerName: partner?.data?.name,
      address: partner?.data?.address,
      phoneNumber: partner?.data?.phoneNumber,
      status: partner?.data?.active,
      prices: {
        address: {
          partner: {
            ...partnerPrices,
          },
          agent: {
            ...agentPrices,
          },
        },
      },
    };

    await mutateAsync({ id: id as string, data: payload });
    refetch();
    onClose();
  };

  return {
    state,
    updatedStateOptions,
    selectedOption,
    isLoading,
    handleChange,
    setSelectedOption,
    handleRemove,
    handleSubmit,
  };
};
