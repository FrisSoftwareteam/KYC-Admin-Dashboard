import CustomModal from '@/components/ui/CustomModal';
import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react';

export function NotificationModal({ isOpen, onClose, data }: any) {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      headertext={'Notification Modal'}
      children={
        <Box pr={'2'}>
          <Stack gap={'2'}>
            <Text fontWeight={500} fontSize={'.9rem'} whiteSpace={'nowrap'}>
              {data?.title}
            </Text>
            <Text fontSize={'.8rem'}>{data?.content}</Text>
          </Stack>

          <HStack justifyContent={'flex-end'} mt={'1.5rem'} mb={'.8rem'}>
            <Button
              bg={'transparent'}
              color={'#4F4F4F'}
              border={'1px'}
              borderColor={'#4F4F4F'}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" onClick={onClose}>
              Continue
            </Button>
          </HStack>
        </Box>
      }
      modalWidth={'35rem'}
    />
  );
}
