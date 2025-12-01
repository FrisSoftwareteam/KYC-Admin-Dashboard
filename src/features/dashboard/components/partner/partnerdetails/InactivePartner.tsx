import { Box, Button, Divider, HStack, Stack, Text } from '@chakra-ui/react';

export function InactivePartner({ name }: { name: string }) {
  return (
    <Box pb={'1rem'}>
      <Stack gap={'.8rem'} pb={'1rem'}>
        <Text fontStyle={'italic'} color={'#313749FD'}>
          You are about to make {`"${name || ' '}"`} partner account inactive.
          This action cannot be undone and this business’s users will no longer
          be able to call for help. Are you sure you want to proceed?
        </Text>
        <Text fontStyle={'italic'} color={'#313749FD'}>
          Are you want to proceed ?
        </Text>
      </Stack>
      <Divider borderColor={'#EFF4FD'} />

      <HStack justifyContent={'flex-end'} w={'full'} pt={'2rem'}>
        <Button
          bg={'transparent'}
          color={'#4F4F4F'}
          border={'1px'}
          borderColor={'#4F4F4F'}
        >
          Cancel
        </Button>
        <Button bg={'#D0021B'} color={'#FFFFFF'}>
          Proceed
        </Button>
      </HStack>
    </Box>
  );
}
