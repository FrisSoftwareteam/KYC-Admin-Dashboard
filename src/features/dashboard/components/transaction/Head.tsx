import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useGetWalletBalanceApi } from '../../api/get-wallet-balance';
import CustomModal from '@/components/ui/CustomModal';
import FundWalletModal from './FundWalletModal';

export default function Head() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading } = useGetWalletBalanceApi();
  // console.log("data is ", data);

  return (
    <Flex
      p={'1.2rem'}
      pr={'4rem'}
      rounded={'.4rem'}
      alignItems={'center'}
      bg={'white'}
      justifyContent={'space-between'}
    >
      <Flex
        alignItems={'flex-end'}
        py={'1.3rem'}
        rounded={'.5rem'}
        bg={'#EAEAEA'}
        gap={'1.2rem'}
        px={'2.3rem'}
      >
        <Box fontFamily={'heading'} color={'#808080'}>
          <Text fontSize={'.8rem'} mb={'.3rem'} color={'#808080'}>
            Wallet balance
          </Text>
          <Text
            lineHeight={'26px'}
            color={'#3E3E3E'}
            fontSize={{ base: '1rem', md: '1.4rem' }}
            fontWeight={700}
          >
            {isLoading ? '₦0' : data?.data?.format?.balance}
          </Text>
        </Box>
        <Button
          fontFamily={'heading'}
          fontSize={'.7rem'}
          border="1px solid #4F4F4F"
          variant={'outline'}
          bg={'white'}
          color={'#4F4F4F'}
          fontWeight={'500'}
          onClick={onOpen}
        >
          Fund your wallet
        </Button>
      </Flex>
      <Flex ml={'4.5rem'} h={'3rem'} gap={{ base: '3rem', md: '3.5rem' }}>
        <Box fontFamily={'heading'}>
          <Text fontSize={'.8rem'} mb={'.3rem'} color={'#808080'}>
            Total verifications cost
          </Text>
          <Text
            lineHeight={'26px'}
            color={'#3E3E3E'}
            fontSize={{ base: '1rem', md: '1.4rem' }}
            fontWeight={700}
          >
            {isLoading ? '₦0' : data?.data?.format?.totalVerificationCost}
          </Text>
        </Box>
        <Divider borderColor={'#E0E0E0'} orientation="vertical" />
        <Box fontFamily={'heading'}>
          <Text fontSize={'.8rem'} mb={'.3rem'} color={'#808080'}>
            Outstanding payment
          </Text>
          <Text
            lineHeight={'26px'}
            color={'#3E3E3E'}
            fontSize={{ base: '1rem', md: '1.4rem' }}
            fontWeight={700}
          >
            {isLoading ? '₦0' : data?.data?.format?.outstanding}
          </Text>
        </Box>
      </Flex>
      <Box mt={'.81rem'} ml={'3rem'}>
        <Button
          onClick={onOpen}
          fontSize={'.78rem'}
          fontWeight={500}
          fontFamily={'heading'}
        >
          Make payment
        </Button>
      </Box>

      <CustomModal
        modalWidth={{ base: '90%', md: '25rem' }}
        isOpen={isOpen}
        onClose={onClose}
        headertext={'Fund wallet'}
      >
        <FundWalletModal onClose={onClose} />
      </CustomModal>
    </Flex>
  );
}
