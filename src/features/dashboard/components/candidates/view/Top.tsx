import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function Top({ name }) {
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
        onClick={() => navigate('/candidates')}
      >
        Candidates
      </Button>
      <Text fontSize={'.8rem'} fontWeight={500}>
        {name}
      </Text>

      <Box />

      {/* <Button
        minW={'9rem'}
        border="1px solid #4F4F4F"
        fontWeight={500}
        fontFamily={'heading'}
        color={'#4F4F4F'}
        variant={'outline'}
        fontSize={'.8rem'}
        h={'2rem'}
        minH={'.1rem'}
      >
        Cancel verification
      </Button> */}
    </Flex>
  );
}
