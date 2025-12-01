import { LogoLoader } from '@/components/elements/loader/Loader';
import CustomSelect from '@/components/input/CustomSelect';
import { usechangeroleApi } from '@/features/dashboard/api/users/change-role';
import { useGetAllUsersApi } from '@/features/dashboard/api/users/get-all-users';
import { useGetRoleApi } from '@/features/dashboard/api/users/get-roles';
import { useToast } from '@/hooks/useToast';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { FormEvent, useMemo, useState } from 'react';

export default function ChangeRoleModal({ onClose, row }: any) {
  const { data: GRapi, isLoading: GRloading } = useGetRoleApi();
  const { mutateAsync: CRapi, isLoading: CRloading } = usechangeroleApi();
  const { refetch } = useGetAllUsersApi();
  const [selectedrole, setSelectedrole] = useState('');
  const toast = useToast();
  const roles = useMemo(
    () =>
      GRapi?.data?.map((item) => ({
        [item.name]: `${item.permissions.map((item) => {
          let str = '';
          str += ' ' + item;
          return str;
        })}`,
      })),
    [GRapi?.data]
  );
  const roleOptions = useMemo(
    () =>
      GRapi?.data?.map((item) => ({
        label: item.name,
        value: item._id,
      })),
    [GRapi?.data]
  );

  if (GRloading) {
    return (
      <Center>
        <LogoLoader w={'10rem'} h={'30rem'} />
      </Center>
    );
  }
  const changeRole = async (e: FormEvent) => {
    e.preventDefault();
    if (!row?.original?._id) {
      toast({ description: 'Invalid user', status: 'error' });
      return;
    }
    if (!selectedrole) {
      toast({ description: 'Please select a role', status: 'error' });
      return;
    }
    await CRapi({
      user: row?.original?._id,
      role: selectedrole as string,
    });
    await refetch();
    onClose();
  };
  return (
    <form onSubmit={changeRole}>
      <Box>
        <CustomSelect
          required={true}
          placeholder="Type  search..."
          options={roleOptions || []}
          onChange={(val) => {
            setSelectedrole(val.value);
          }}
          label="Select role"
        />
      </Box>
      <Stack spacing={'1.5rem'} mt={'1.5rem'}>
        {roles?.map((item, index) => {
          const key = Object.keys(item)[0];
          const value = item[key];
          return (
            <Flex key={index} alignItems={'flex-start'}>
              <Text
                color={'#333333'}
                fontWeight={500}
                fontFamily={'heading'}
                fontSize={'.8rem'}
                minW={'8rem'}
              >
                {key}:
              </Text>
              <Text
                fontWeight={400}
                color={'#7C7C7C'}
                fontFamily={'heading'}
                fontSize={'.8rem'}
              >
                {value}
              </Text>
            </Flex>
          );
        })}
      </Stack>
      <Divider mt={'1rem'} borderColor={'#EFF4FD'} />
      <Flex
        gap={'1rem'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        py={'2rem'}
      >
        <Button
          color={'#4F4F4F'}
          fontSize={'.9rem'}
          maxW={'6rem'}
          variant={'outline'}
          minH={'2.5rem'}
          onClick={() => onClose()}
        >
          Cancel
        </Button>
        <Button
          isLoading={CRloading}
          minH={'2.5rem'}
          fontSize={'.9rem'}
          maxW={'6rem'}
          type="submit"
        >
          Update
        </Button>
      </Flex>
    </form>
  );
}
