import CustomInput from '@/components/input/CustomInput';
import {
  Box,
  Button,
  Divider,
  Flex,
  GridItem,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import avatar from '@/assets/images/settings/avatar.png';
import CustomModal from '@/components/ui/CustomModal';
import ChangePasswordModal from './ChangePasswordModal';
import { useGetUserprofileApi } from '@/features/dashboard/api/users/get-user-profile';
import { LogoLoader } from '@/components/elements/loader/Loader';
export default function General() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data: GUPapi, isLoading: GUPloading } = useGetUserprofileApi();

  if (GUPloading) {
    return <LogoLoader />;
  }
  return (
    <Box
      pl={'1.5rem'}
      pt={'2.3rem'}
      minH={'80vh'}
      bg={'white'}
      rounded={'.4rem'}
    >
      <Text
        color={'#4F4F4F'}
        fontSize={'1.1rem'}
        fontWeight={500}
        fontFamily={'heading'}
      >
        Personal information
      </Text>
      <Box maxW={'55rem'} mt={'2rem'}>
        <Flex gap={'1.5rem'}>
          <Box w={'10rem'} h={'100%'}>
            <Image src={avatar} h={'100%'} w={'100%'} objectFit={'contain'} />
          </Box>
          <SimpleGrid gap={'1.5rem'} row={2} columns={2}>
            <GridItem w={'20rem'}>
              <CustomInput
                inputProps={{
                  name: 'firstName',
                  type: 'text',
                  placeholder: 'Adewale',
                  defaultValue: GUPapi?.data?.firstName,
                }}
                formControlProps={{ isReadOnly: true, label: 'First name' }}
              />
            </GridItem>
            <GridItem>
              <CustomInput
                inputProps={{
                  name: 'lasttName',
                  type: 'text',
                  placeholder: 'John',
                  value: GUPapi?.data?.lastName,
                }}
                formControlProps={{ isReadOnly: true, label: 'Last name' }}
              />
            </GridItem>
            <GridItem>
              <CustomInput
                inputProps={{
                  name: 'email',
                  type: 'email',
                  placeholder: 'adewale@gmail.com',
                  defaultValue: GUPapi?.data?.email,
                }}
                formControlProps={{ isReadOnly: true, label: 'Email' }}
              />
            </GridItem>
            <GridItem>
              <CustomInput
                inputProps={{
                  name: 'phoneNumber',
                  type: 'text',
                  placeholder: '09000000112',
                  defaultValue: `${GUPapi?.data?.phoneNumber?.countryCode} ${GUPapi?.data?.phoneNumber?.number}`,
                }}
                formControlProps={{ isReadOnly: true, label: 'Phone number' }}
              />
            </GridItem>
          </SimpleGrid>
        </Flex>
        <Divider mt={'3rem'} mb={'1.4rem'} borderColor={'#EFF4FD'} />
        <Flex
          gap={'1rem'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          mb={'2rem'}
          pr={'5rem'}
        >
          <Button
            color={'#4F4F4F'}
            fontSize={'.9rem'}
            minW={'11rem'}
            variant={'outline'}
            minH={'2.5rem'}
            fontWeight={500}
            fontFamily={'heading'}
            onClick={onOpen}
          >
            Change password
          </Button>
          <Button isDisabled minH={'2.5rem'} fontSize={'.9rem'} minW={'8rem'}>
            Save changes
          </Button>
        </Flex>
      </Box>

      <CustomModal
        modalWidth={{ base: '90%', md: '30rem' }}
        isOpen={isOpen}
        onClose={onClose}
        headertext={'Change password'}
      >
        <ChangePasswordModal onClose={onClose} />
      </CustomModal>
    </Box>
  );
}
