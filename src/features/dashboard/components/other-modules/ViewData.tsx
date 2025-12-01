import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Stack,
  Text,
  HStack,
  Heading,
  Box,
} from '@chakra-ui/react';
import { TuseModulesHook } from '../../hooks/useModulesHook';
import { formatNumber } from '@/utils/add-comma';
import CustomSelect from '@/components/input/CustomSelect';

export function ViewData({ hook }: { hook: TuseModulesHook }) {
  const {
    viewDisclosure,
    viewData,
    GAUapi,
    SEisLoading,
    AVisLoading,
    setVerifier,
    sendEmail,
    handleApprove,
  } = hook;

  return (
    <Drawer
      placement="right"
      size={'md'}
      isOpen={viewDisclosure.isOpen}
      onClose={viewDisclosure.onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {`${viewData?.candidate?.firstName || 'No Name'} Data`}
        </DrawerHeader>

        <DrawerBody>
          <Stack gap={'4'}>
            <HStack justifyContent={'space-between'}>
              <Text>Project Type:</Text>
              <Text textTransform={'capitalize'}>
                {viewData?.verificationType}
              </Text>
            </HStack>
            <HStack justifyContent={'space-between'}>
              <Text>Payment Type:</Text>
              <Text>{viewData?.paymentType}</Text>
            </HStack>
            <HStack justifyContent={'space-between'}>
              <Text>Cost:</Text>
              <Text>{`₦${formatNumber(viewData?.cost)}`}</Text>
            </HStack>
            <Stack borderTop={'1px solid black'}>
              <Heading size={'sm'} py={'4'}>
                Select A Verifier
              </Heading>
              <Box mt={'-3'}>
                <CustomSelect
                  options={
                    GAUapi?.data?.map((item) => ({
                      label: `Name: ${item?.firstName} ${item?.lastName} - Email: ${item?.email}`,
                      value: item?._id,
                    })) || []
                  }
                  onChange={(e) => setVerifier(e?.value)}
                />

                <Button mt={'4'} onClick={sendEmail} isLoading={SEisLoading}>
                  Send Email
                </Button>
              </Box>
            </Stack>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={viewDisclosure.onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            isLoading={AVisLoading}
            onClick={handleApprove}
          >
            Approve
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
