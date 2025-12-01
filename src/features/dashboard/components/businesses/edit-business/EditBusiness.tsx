import {
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import Head from './Head';
import CustomInput from '@/components/input/CustomInput';
import CustomSelect from '@/components/input/CustomSelect';
import { useEditBusinessHook } from '@/features/dashboard/hooks/useEditBusinessHook';
import { industryOptions } from '@/data/options/industry';
import { useNavigate } from 'react-router-dom';

export function EditBusiness() {
  const navigate = useNavigate();
  const { isLoading, handleFormSubmit, handleChange, setFieldValue, values } =
    useEditBusinessHook();
  return (
    <Box>
      <Head />

      <Stack p={'1.5rem'} pt={'1rem'} spacing={'1.2rem'}>
        <Box>
          <Text mb={'.7rem'} color={'#565656'} fontFamily={'heading'}>
            Business information
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
              <Stack spacing={'1.1rem'}>
                <Flex gap={'2rem'} justifyContent={'space-between'}>
                  <CustomInput
                    inputProps={{
                      name: 'businessName',
                      type: 'text',
                      placeholder: 'valerie@example.com',
                      value: values.businessName,
                      onChange: handleChange,
                    }}
                    formControlProps={{
                      label: 'Business name',
                    }}
                  />
                  <CustomInput
                    inputProps={{
                      name: 'Business email address',
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
                </Flex>

                <Flex gap={'2rem'} justifyContent={'space-between'}>
                  <CustomInput
                    inputProps={{
                      name: 'businessPhoneNumber',
                      type: 'text',
                      placeholder: '09018982001',
                      value: values.businessPhoneNumber,
                      onChange: handleChange,
                    }}
                    formControlProps={{
                      isRequired: true,
                      label: 'Business phone number',
                    }}
                  />
                  <CustomInput
                    inputProps={{
                      name: 'address',
                      placeholder: '15, Alimosho lagos',
                      value: values.address,
                      onChange: handleChange,
                    }}
                    formControlProps={{
                      isRequired: true,
                      label: 'Address',
                    }}
                  />
                </Flex>

                <Flex gap={'2rem'} justifyContent={'space-between'}>
                  <Box flex={1 / 2}>
                    <CustomSelect
                      placeholder="Type  search..."
                      label="Industry"
                      options={industryOptions}
                      onChange={(val) => {
                        setFieldValue('industry', val.value);
                      }}
                    />
                  </Box>
                </Flex>
              </Stack>
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
              <Button type="submit" isLoading={isLoading}>
                Update
              </Button>
            </HStack>
          </chakra.form>
        </Box>
      </Stack>
    </Box>
  );
}
