import CustomModal from '@/components/ui/CustomModal';
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import UnFlagModal from './verification-details/UnFlagModal';
import ApproveAddress from './verification-details/ApproveAddress';
import RejectAddress from './RejectAddress';

export default function Action({ data }: any) {
  const unFlagDisclosure = useDisclosure();
  const rejectDisclosure = useDisclosure();
  const approveDisclosure = useDisclosure();
  if (
    !data.isFlagged &&
    !(
      data.status === 'verified' ||
      data.status === 'failed' ||
      data.status === 'created'
    )
  ) {
    return;
  }
  return (
    <Box position={'relative'}>
      <Popover>
        <PopoverTrigger>
          <HiDotsVertical cursor={'pointer'} />
        </PopoverTrigger>
        <PopoverContent
          w={'10rem'}
          rounded={'.5rem'}
          border="none !important"
          outline={'none !important'}
          _focusVisible={{
            boxShadow:
              '0px 1px 2px 0px #0000001A, 0px 4px 4px 0px #00000017, 0px 9px 5px 0px #0000000D, 0px 15px 6px 0px #00000003, 0px 24px 7px 0px #00000000, 0px 1px 0px 0px #6867671A, 0px -4px 4px 0px #0000001A', // Apply the specified box shadows
          }}
          boxShadow="0px 1px 2px 0px #0000001A, 0px 4px 4px 0px #00000017, 0px 9px 5px 0px #0000000D, 0px 15px 6px 0px #00000003, 0px 24px 7px 0px #00000000, 0px 1px 0px 0px #6867671A, 0px -4px 4px 0px #0000001A" // Apply the specified box shadows
        >
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              {data?.isFlagged && (
                <Text
                  pb={'.2rem'}
                  borderBottom={'1px solid #EAEAEA'}
                  fontSize={'.81rem'}
                  fontFamily={'heading'}
                  cursor={'pointer'}
                  onClick={unFlagDisclosure.onOpen}
                >
                  Unflag
                </Text>
              )}
              {(data.status === 'verified' || data.status === 'failed') && (
                <Text
                  fontSize={'.81rem'}
                  fontFamily={'heading'}
                  cursor={'pointer'}
                  onClick={approveDisclosure.onOpen}
                >
                  Approve
                </Text>
              )}
              {data.status === 'created' && (
                <Stack>
                  <Text
                    fontSize={'.81rem'}
                    fontFamily={'heading'}
                    cursor={'pointer'}
                    onClick={rejectDisclosure.onOpen}
                  >
                    Reject
                  </Text>
                  {/* <Text
                  fontSize={'.81rem'}
                  fontFamily={'heading'}
                  cursor={'pointer'}
                  onClick={rejectDisclosure.onOpen}
                >
                  Approve
                </Text> */}
                </Stack>
              )}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <CustomModal
        modalWidth={{ base: '90%', md: '20rem' }}
        isOpen={unFlagDisclosure.isOpen}
        onClose={unFlagDisclosure.onClose}
        headertext={'Unflag Verification'}
      >
        <UnFlagModal onClose={unFlagDisclosure.onClose} row={data} />
      </CustomModal>
      <CustomModal
        modalWidth={{ base: '90%', md: '20rem' }}
        isOpen={approveDisclosure.isOpen}
        onClose={approveDisclosure.onClose}
        headertext={'Approve Verification'}
      >
        <ApproveAddress onClose={approveDisclosure.onClose} row={data} />
      </CustomModal>
      <CustomModal
        modalWidth={{ base: '90%', md: '20rem' }}
        isOpen={rejectDisclosure.isOpen}
        onClose={rejectDisclosure.onClose}
        headertext={'Reject Verification'}
      >
        <RejectAddress onClose={rejectDisclosure.onClose} row={data} />
      </CustomModal>
    </Box>
  );
}
