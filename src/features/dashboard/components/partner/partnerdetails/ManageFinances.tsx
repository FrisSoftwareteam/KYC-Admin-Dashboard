import CustomInput from '@/components/input/CustomInput';
import CustomSelect from '@/components/input/CustomSelect';
import { useManagePartnerFinancesHook } from '@/features/dashboard/hooks/useManagePartnerFinanceHook';
import { formatNumber } from '@/utils/add-comma';
import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { BsX } from 'react-icons/bs';

export function ManageFinances({ onClose }: { onClose: () => void }) {
  const {
    state,
    updatedStateOptions,
    selectedOption,
    isLoading,
    handleChange,
    setSelectedOption,
    handleRemove,
    handleSubmit,
  } = useManagePartnerFinancesHook({ onClose });

  return (
    <Box pb={'1rem'}>
      <Grid templateColumns="repeat(7, 1fr)" gap={5}>
        <GridItem colSpan={3}>
          <CustomSelect
            placeholder="Type  search..."
            label="States"
            options={updatedStateOptions || []}
            onChange={(e) => {
              return setSelectedOption(e?.value);
            }}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <CustomInput
            inputProps={{
              type: 'number',
              placeholder: ' ₦500',
              value: state?.find((item) => item?.name === selectedOption)
                ?.partner,
              onChange: (e) => handleChange(e.target.value, 'partner'),
            }}
            formControlProps={{
              isRequired: true,
              label: 'Partners price',
            }}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <CustomInput
            inputProps={{
              type: 'number',
              placeholder: ' ₦500',
              value: state?.find((item) => item?.name === selectedOption)
                ?.agent,
              onChange: (e) => handleChange(e.target.value, 'agent'),
            }}
            formControlProps={{
              isRequired: true,
              label: 'Agent price',
            }}
          />
        </GridItem>
      </Grid>

      <Box my={'4'}>
        <Text mb={'.7rem'} color={'#565656'} fontFamily={'heading'}>
          Computed state with price
        </Text>

        <Stack
          gap={1}
          border={'1px solid #5c6877'}
          p={'1rem'}
          borderRadius={'.8rem'}
        >
          <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
            <Box>
              <Text
                fontWeight={600}
                color={'#828282'}
                textTransform={'capitalize'}
              >
                Location
              </Text>
            </Box>
            <HStack w={'full'} gap={'5'} justify={'space-between'} mb={'.5rem'}>
              <Text fontWeight={600} color={'#4F4F4F'} w={'100%'}>
                Partner
              </Text>
              <Text fontWeight={600} color={'#4F4F4F'} w={'100%'}>
                Agent
              </Text>
              <Text fontWeight={600} color={'#4F4F4F'} w={'100%'}>
                Action
              </Text>
            </HStack>
          </SimpleGrid>
          {state?.map((item) => (
            <SimpleGrid
              columns={2}
              spacingX="40px"
              spacingY="20px"
              key={item.name}
            >
              <Box>
                <Text
                  fontWeight={400}
                  color={'#828282'}
                  textTransform={'capitalize'}
                >
                  {item.name}:
                </Text>
              </Box>
              <HStack
                w={'full'}
                gap={'5'}
                justify={'space-between'}
                mb={'.5rem'}
              >
                <Text fontWeight={400} color={'#4F4F4F'} w={'100%'}>
                  ₦{formatNumber(item.partner)}
                </Text>
                <Text fontWeight={400} color={'#4F4F4F'} w={'100%'}>
                  ₦{formatNumber(item.agent)}
                </Text>
                <Box cursor={'pointer'} onClick={() => handleRemove(item.name)}>
                  <BsX size={20} color="#e10000" />
                </Box>
              </HStack>
            </SimpleGrid>
          ))}
        </Stack>
      </Box>

      <Divider borderColor={'#EFF4FD'} />

      <HStack justifyContent={'flex-end'} w={'full'} pt={'2rem'}>
        <Button
          bg={'transparent'}
          color={'#4F4F4F'}
          border={'1px'}
          borderColor={'#4F4F4F'}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button isLoading={isLoading} onClick={handleSubmit}>
          Save changes
        </Button>
      </HStack>
    </Box>
  );
}
