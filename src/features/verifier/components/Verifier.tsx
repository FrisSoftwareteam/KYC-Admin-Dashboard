import CustomInput from '@/components/input/CustomInput';
import {
  Box,
  Button,
  GridItem,
  HStack,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useVerifierHook } from '../hooks/useVerifier';
import FileInput from '@/components/input/FileInput';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { formatDate } from '@/utils/date-formater';

export function Verifier() {
  const {
    isLoading,
    payload,
    handlePayload,
    handleInput,
    data,
    info,
    handleFormSubmit,
  } = useVerifierHook();

  return (
    <Stack maxW={'95%'}>
      <Heading size={'md'} textAlign={'center'} textTransform={'capitalize'}>
        {`${data?.data?.candidate?.firstName || '-'} ${
          data?.data?.candidate?.lastName || ''
        } ${data?.data?.verificationType || '-'}`}
      </Heading>
      <SimpleGrid columns={2} gap={'24'} pt={'6'}>
        <GridItem>
          <Heading size={'sm'}>User info</Heading>

          <Stack spacing={'8'} pt={'8'} overflowX={'clip'}>
            {info
              ?.filter((item) => item.key !== '_id')
              .map((item) => {
                // Check if key ends with "At" and format the value
                const formattedValue =
                  item.key.endsWith('At') && item.value !== 'null'
                    ? formatDate(item.value)
                    : item.value;

                return (
                  <HStack justifyContent={'space-between'} key={item.key}>
                    <Text textTransform={'capitalize'}>{`${item.key.replace(
                      /At$/,
                      ' At'
                    )}:`}</Text>
                    {formattedValue?.startsWith('https:') ? (
                      <Link
                        href={`${formattedValue}`}
                        color={'blue'}
                        target={'_blank'}
                      >
                        Link
                      </Link>
                    ) : (
                      <Text textTransform={'capitalize'}>
                        {formattedValue.replace('null', '_')}
                      </Text>
                    )}
                  </HStack>
                );
              })}
          </Stack>
        </GridItem>
        <GridItem
          border={'1px solid #11406F'}
          px={'4'}
          py={'2'}
          boxShadow={'2xl'}
          rounded={'12px'}
        >
          <Heading size={'sm'}>Verifier's comment</Heading>
          <Stack spacing={'1.5rem'} pt={'8'}>
            {payload?.map((item) =>
              item.type === 'input' ? (
                <HStack alignItems={'flex-end'} key={item.id}>
                  <Box w={'30%'}>
                    <CustomInput
                      inputProps={{
                        value: item.key,
                        onChange: (e) =>
                          handleInput(e?.target?.value, item.id, 'key'),
                        placeholder: 'Enter Label',
                      }}
                      formControlProps={{ label: 'Label' }}
                    />
                  </Box>
                  <CustomInput
                    inputProps={{
                      value: item.value as string,
                      onChange: (e) =>
                        handleInput(e?.target?.value, item.id, 'value'),
                      placeholder: 'Type...',
                    }}
                    formControlProps={{ label: item.key || 'No label' }}
                  />
                  <Box pb={'2.5'}>
                    {item.id === 0 ? (
                      <Icon
                        fontSize={'1.3rem'}
                        as={AddIcon}
                        onClick={() => handlePayload('input')}
                      />
                    ) : (
                      <Icon
                        fontSize={'1.3rem'}
                        as={MinusIcon}
                        onClick={() => handlePayload('input', item.id)}
                      />
                    )}
                  </Box>
                </HStack>
              ) : (
                <HStack alignItems={'flex-end'} key={item.id}>
                  <Box w={'30%'}>
                    <CustomInput
                      inputProps={{
                        value: item.key,
                        onChange: (e) =>
                          handleInput(e?.target?.value, item.id, 'key'),
                        placeholder: 'Enter Label',
                      }}
                      formControlProps={{ label: 'Label' }}
                    />
                  </Box>
                  <FileInput
                    formControlProps={{ label: 'Upload file' }}
                    inputProps={{
                      onChange: (e) =>
                        handleInput(
                          e?.target?.files?.[0] as File,
                          item.id,
                          'value'
                        ),
                      placeholder: 'Upload a file...',
                    }}
                  />
                  <Box pb={'2.5'}>
                    {item.id === 1 ? (
                      <Icon
                        fontSize={'1.3rem'}
                        as={AddIcon}
                        onClick={() => handlePayload('file')}
                      />
                    ) : (
                      <Icon
                        fontSize={'1.3rem'}
                        as={MinusIcon}
                        onClick={() => handlePayload('file', item.id)}
                      />
                    )}
                  </Box>
                </HStack>
              )
            )}
          </Stack>

          <HStack
            mt={'1rem'}
            justifyContent={'space-between'}
            pr={'10'}
            pt={'4'}
          >
            <Button
              isLoading={isLoading}
              fontWeight={500}
              bg={'red'}
              _hover={{ bg: 'red' }}
              onClick={() => handleFormSubmit('failed')}
            >
              Not verify
            </Button>

            <Button
              isLoading={isLoading}
              fontWeight={500}
              onClick={() => handleFormSubmit('verify')}
            >
              Verify
            </Button>
          </HStack>
        </GridItem>
      </SimpleGrid>
    </Stack>
  );
}
