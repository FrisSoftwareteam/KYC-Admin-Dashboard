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
import { useNavigate } from 'react-router-dom';
import { useAddPartnerHook } from '@/features/dashboard/hooks/useAddPartnerHook';
import CustomSelect from '@/components/input/CustomSelect';
import { stateOptions } from '@/data/options/state';

export function InvitePartner() {
  const navigate = useNavigate();

  const {
    handleFormSubmit,
    handleChange,
    handleSettings,
    values,
    isLoading,
    touched,
    errors,
    permissionsData,
    settings,
  } = useAddPartnerHook();

  return (
    <Box>
      <Head />

      <Stack p={'1.5rem'} pt={'1rem'} spacing={'1.2rem'}>
        <Text mb={'.7rem'} color={'#565656'} fontFamily={'heading'}>
          Partner information
        </Text>
        <chakra.form onSubmit={handleFormSubmit} w="full">
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
                  placeholder: 'You First Technology',
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
                  name: 'email',
                  type: 'email',
                  placeholder: 'valerie@example.com',
                  value: values.email,
                  onChange: handleChange,
                }}
                formControlProps={{
                  isRequired: true,
                  label: 'Business email address',
                }}
              />

              <CustomInput
                inputProps={{
                  name: 'address',
                  placeholder: 'No 12, Aminu Estate, Lagos Mainland',
                  value: values.address,
                  onChange: handleChange,
                }}
                formControlProps={{
                  isRequired: true,
                  label: 'Address',
                }}
              />

              <CustomInput
                inputProps={{
                  // type: 'number',
                  name: 'phoneNumber',
                  placeholder: '09088334000',
                  value: values.phoneNumber,
                  onChange: handleChange,
                }}
                formControlProps={{
                  isRequired: true,
                  label: 'Phone number',
                }}
                errorMessage={
                  touched.phoneNumber && errors.phoneNumber
                    ? errors.phoneNumber
                    : ''
                }
                touched={touched.phoneNumber}
              />
              <CustomInput
                inputProps={{
                  // type: 'number',
                  name: 'directorNin',
                  placeholder: '12780418710',
                  value: values.directorNin,
                  onChange: handleChange,
                }}
                formControlProps={{
                  label: 'Director NIN',
                }}
              />
              <CustomInput
                inputProps={{
                  name: 'cacNumber',
                  placeholder: '3871095',
                  value: values.cacNumber,
                  onChange: handleChange,
                }}
                formControlProps={{
                  label: 'CAC number',
                }}
              />
              <GridItem colSpan={2}>
                <CustomSelect
                  isMulti
                  placeholder="Type  search..."
                  label="Operation States"
                  options={stateOptions || []}
                  onChange={(e) => handleSettings(e, 'states')}
                />
              </GridItem>
            </SimpleGrid>
          </Stack>

          <Text mb={'.7rem'} color={'#565656'} fontFamily={'heading'} pt={'5'}>
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
                  onChange={(e) => handleSettings(e.target.checked, item.value)}
                  isChecked={settings[item.value]}
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
              Continue
            </Button>
          </HStack>
        </chakra.form>
      </Stack>
    </Box>
  );
}
