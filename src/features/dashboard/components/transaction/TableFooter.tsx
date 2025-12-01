import { Center } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function TableFooter() {
  return (
    <Link to={'/verifications'}>
      <Center
        border="1px solid #4F4F4F"
        py={'.65rem'}
        mt={'1.5rem'}
        bg={'white'}
        rounded={'.4rem'}
        color={'#4F4F4F'}
        fontFamily={'heading'}
        fontSize={'.9rem'}
        fontWeight={500}
      >
        View all verifications
      </Center>
    </Link>
  );
}
