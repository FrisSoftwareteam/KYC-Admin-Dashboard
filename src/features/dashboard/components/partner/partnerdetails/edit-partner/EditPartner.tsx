import {
  Box,
  Button,
  chakra,
  Checkbox,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import Head from './Head';
import CustomInput from '@/components/input/CustomInput';
import { useEditPartnerHook } from '@/features/dashboard/hooks/useEditPartnerHook';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '@/components/input/CustomSelect';
import { stateOptions } from '@/data/options/state';

export function EditPartner() {
  const navigate = useNavigate();

  const {
    isLoading,
    handleFormSubmit,
    handleChange,
    handleSettings,
    permissionsData,
    values,
    states,
  } = useEditPartnerHook();

  const defaultValue = stateOptions
    ?.filter((item) => states?.includes(item.value))
    ?.map((item) => item);

  return (
    <Box>
      <Head />

      <Stack p={'1.5rem'} pt={'1rem'} spacing={'1.2rem'}>
        <Box>
          <Text mb={'.7rem'} color={'#565656'} fontFamily={'heading'}>
            Partner information
          </Text>
          <chakra.form w="full" onSubmit={handleFormSubmit}>
            <Stack
              bg={'white'}
              pt={'1.8rem'}
              pb={'2rem'}
              px={'2rem'}
              width={'43.375rem'}
              rounded={'5px'}
            >
              <SimpleGrid columns={2} columnGap={'2rem'} rowGap={'1rem'}>
                <CustomInput
                  inputProps={{
                    name: 'partnerName',
                    value: values.partnerName,
                    onChange: handleChange,
                  }}
                  formControlProps={{
                    isRequired: true,
                    label: 'Partner name',
                  }}
                />
                <CustomInput
                  inputProps={{
                    name: 'address',
                    value: values.address,
                    onChange: handleChange,
                  }}
                  formControlProps={{
                    isRequired: true,
                    label: 'Partner address',
                  }}
                />{' '}
                <CustomInput
                  inputProps={{
                    // type: 'number',
                    name: 'phoneNumber',
                    value: values.phoneNumber,
                    onChange: handleChange,
                  }}
                  formControlProps={{
                    isRequired: true,
                    label: 'Partner phone number',
                  }}
                />
                <GridItem colSpan={2}>
                  <CustomSelect
                    isMulti
                    placeholder="Type  search..."
                    label="Operation States"
                    options={stateOptions || []}
                    onChange={(e) => handleSettings(e, 'states')}
                    defaultValue={defaultValue}
                  />
                </GridItem>
              </SimpleGrid>
            </Stack>

            <Text
              mb={'.7rem'}
              color={'#565656'}
              fontFamily={'heading'}
              pt={'5'}
            >
              Partner access
            </Text>

            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={4}
              bg={'white'}
              pt={'1.8rem'}
              pb={'2rem'}
              px={'2rem'}
              width={'43.375rem'}
              rounded={'5px'}
            >
              {permissionsData?.map((item) => (
                <GridItem key={item.id}>
                  <Checkbox
                    onChange={(e) =>
                      handleSettings(e.target.checked, item.value)
                    }
                    isChecked={values.settings[item.value]}
                  >
                    {item.name}
                  </Checkbox>
                </GridItem>
              ))}
            </Grid>
            <HStack justifyContent={'flex-end'} width={'43.375rem'} mt={'1rem'}>
              <Button
                bg={'transparent'}
                color={'#4F4F4F'}
                border={'1px'}
                borderColor={'#4F4F4F'}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button isLoading={isLoading} type="submit">
                Update
              </Button>
            </HStack>
          </chakra.form>
        </Box>
      </Stack>
    </Box>
  );
}
