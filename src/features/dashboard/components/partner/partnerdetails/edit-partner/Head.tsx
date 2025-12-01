import { Flex, Button, Text, Box } from '@chakra-ui/react';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function Head({ name }: { name?: string }) {
  const navigate = useNavigate();
  return (
    <Flex
      my={'1px'}
      alignItems={'center'}
      justifyContent={'space-between'}
      bg={'white'}
      px={'1.8rem'}
      h={'4rem'}
    >
      <Button
        fontWeight={400}
        fontSize={'.8rem'}
        minH={'.1rem'}
        h={'2rem'}
        leftIcon={<BsArrowLeft />}
        variant={'ghost'}
        _hover={{ bg: 'transparent' }}
        maxW={'6rem'}
        onClick={() => navigate(-1)}
      >
        Partner
      </Button>
      <Text fontSize={'.8rem'} fontWeight={500}>
        {name || 'Edit Partner'}
      </Text>
      <Box />
    </Flex>
  );
}
