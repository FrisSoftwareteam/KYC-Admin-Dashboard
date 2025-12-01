import {
  Box,
  Button,
  chakra,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import Head from './Head';
import CustomInput from '@/components/input/CustomInput';
import CustomSelect from '@/components/input/CustomSelect';
import { useAddBusinessHook } from '@/features/dashboard/hooks/useAddBusinessHook';
import { industryOptions } from '@/data/options/industry';
import { useNavigate } from 'react-router-dom';

export function AddBusiness() {
  const navigate = useNavigate();
  const { handleFormSubmit, handleChange, setFieldValue, values, isLoading } =
    useAddBusinessHook();
  return (
    <Box>
      <Head />

      <Stack p={'1.5rem'} pt={'1rem'} spacing={'1.2rem'}>
        <Box>
          <Text mb={'.7rem'} color={'#565656'} fontFamily={'heading'}>
            Business information
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
                    name: 'businessName',
                    placeholder: 'First central',
                    value: values.businessName,
                    onChange: handleChange,
                  }}
                  formControlProps={{
                    isRequired: true,
                    label: 'Business name',
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
                    name: 'cacNumber',
                    placeholder: '3871095',
                    value: values.cacNumber,
                    onChange: handleChange,
                  }}
                  formControlProps={{
                    label: 'CAC number',
                  }}
                />
                <CustomInput
                  inputProps={{
                    name: 'directorNin',
                    placeholder: '12780418710',
                    value: values.directorNin,
                    onChange: handleChange,
                  }}
                  formControlProps={{
                    label: 'Director NIN',
                  }}
                />

                <Box>
                  <CustomSelect
                    placeholder="Type  search..."
                    label="Industry"
                    options={industryOptions}
                    onChange={(val) => {
                      setFieldValue('industry', val.value);
                    }}
                  />
                </Box>
                <CustomInput
                  inputProps={{
                    name: 'phoneNumber',
                    placeholder: '09088334000',
                    value: values.phoneNumber,
                    onChange: handleChange,
                  }}
                  formControlProps={{
                    isRequired: true,
                    label: 'Phone number',
                  }}
                />
              </SimpleGrid>
            </Stack>

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
        </Box>
      </Stack>
    </Box>
  );
}
