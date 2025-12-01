import CustomSelect from '@/components/input/CustomSelect';
import { Box, Flex, Text } from '@chakra-ui/react';

export default function TableHeader({
  name,
  setSelectedBusiness,
  options,
}: any) {
  return (
    <Flex
      p={'1.8rem'}
      h={'3.5rem'}
      boxShadow="0px 5px 8px 0px #0A00820C"
      alignItems={'center'}
      justifyContent={'space-between'}
      bg={'#FFFFFF'}
      pr={'2.81rem'}
      rounded={'.4rem'}
    >
      <Box w={'20rem'}>
        <CustomSelect
          placeholder="Select business..."
          options={options}
          onChange={(val) => {
            setSelectedBusiness(val.value);
          }}
          defaultValue={options[0]}
        />
      </Box>

      {/* Change the total to the business name selected */}
      <Text fontWeight={500} fontSize={'.8rem'}>
        {name} Verifications
      </Text>
    </Flex>
  );
}
