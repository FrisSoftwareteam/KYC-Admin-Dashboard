import { Logo } from '@/components/Logo/Logo';
import { Box, Center, Heading, HStack } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <HStack
        justifyContent={'space-between'}
        borderBottom={'1px solid #11406F'}
      >
        <Box pl={'1.5rem'} py={'1rem'}>
          <Logo to="/" w={'7rem'} />
        </Box>
        <Heading size={'md'}>Verifier Dashboard</Heading>
        <Box />
      </HStack>
      <Box minW={'100vw'} minH={'93vh'} pt={'12'}>
        <Center>{children}</Center>
      </Box>
    </Box>
  );
}
