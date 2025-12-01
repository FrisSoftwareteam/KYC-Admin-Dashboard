import { Box, Button, Divider, HStack, Stack, Text } from '@chakra-ui/react';

export function DisablePartner({
  name,
  status,
  isLoading,
  handleSubmit,
}: {
  name: string;
  status: boolean;
  isLoading: boolean;
  handleSubmit: () => void;
}) {
  return (
    <Box pb={'1rem'}>
      <Stack gap={'.8rem'} pb={'1rem'}>
        <Text fontStyle={'italic'} color={'#313749FD'}>
          You are about to {status ? 'disable' : 'restore'} the{' '}
          {`"${name || ' '}"`} partner account. This action cannot be undone and
          this partner's users will no longer be able to call for help. Are you
          sure you want to proceed?
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
        <Button
          bg={status ? '#D0021B' : '#10B759'}
          color={'#FFFFFF'}
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          {status ? 'Remove' : 'Restore'} Partner
        </Button>
      </HStack>
    </Box>
  );
}
