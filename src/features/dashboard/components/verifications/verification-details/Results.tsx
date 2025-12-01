import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import IdentityResult from './IdentityResult';
import AddressResult from './AddressResult';
import { MdLocationOn } from 'react-icons/md';
import { PiUserCircleFill } from 'react-icons/pi';
// import CertificateResult from './CertificateResult';
// import { FaGraduationCap } from 'react-icons/fa';
// import { TbBriefcaseFilled } from 'react-icons/tb';
// import EmploymentResult from './EmploymentResult';
import {
  IAddressVerification,
  IIdentityVerification,
  // VerificationsResponse,
} from '@/shared/interface/verification';
import { getVerificationAccordionColor } from '@/utils/get-color';
import Status from '@/components/elements/status/Status';
export default function Results({ data }: { data?: any }) {
  const accordionpadding = '2.5rem';
  // console.log('data is ', data);
  const hasIdentity = data?.identity
    ? (data.identity as IIdentityVerification)
    : undefined;
  const hasAddress = data?.address
    ? (data.address as IAddressVerification)
    : undefined;
  const identityFailed = hasIdentity?.status === 'failed';
  const addressFailed = hasAddress?.status === 'failed';
  return (
    <Box>
      <Text mb={'.7rem'} color={'#565656'} fontFamily={'heading'}>
        Results
      </Text>

      <Stack p={'1.5rem'} rounded={'5px'} bg={'white '}>
        <Accordion allowMultiple>
          {/* ====================== IDENTITY ========================= */}
          {hasIdentity && (
            <AccordionItem
              bg={'transparent !important'}
              outline={'none'}
              boxShadow={'none'}
              border="1px solid #EAEAEA"
              rounded={'.5rem'}
              overflow={'hidden'}
              mb={'1.5rem'}
              px={'0'}
              paddingInline={'0'}
              padding={'0'}
              paddingInlineEnd={'0'}
            >
              <h2>
                <AccordionButton
                  _hover={{
                    bg: getVerificationAccordionColor(hasIdentity?.status),
                  }}
                  bg={getVerificationAccordionColor(hasIdentity?.status)}
                  px={accordionpadding}
                  h={'4rem'}
                  color={identityFailed ? 'white' : '#4F4F4F'}
                >
                  <Flex alignItems={'center'} gap={'.5rem'} flex="1">
                    <PiUserCircleFill size={'1.2rem'} />
                    <Text fontWeight={500} fontFamily={'heading'}>
                      Identity verification
                    </Text>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} px={0}>
                <IdentityResult data={data} />
              </AccordionPanel>
            </AccordionItem>
          )}

          {/* =========================== ADDRESS ======================== */}
          {hasAddress && (
            <AccordionItem
              bg={'transparent !important'}
              outline={'none'}
              boxShadow={'none'}
              border="1px solid #EAEAEA"
              rounded={'.5rem'}
              overflow={'hidden'}
              mb={'1.5rem'}
              px={'0'}
              paddingInline={'0'}
              padding={'0'}
              paddingInlineEnd={'0'}
            >
              <h2>
                <AccordionButton
                  _hover={{
                    bg: getVerificationAccordionColor(hasAddress?.status),
                  }}
                  bg={getVerificationAccordionColor(hasAddress?.status)}
                  px={accordionpadding}
                  h={'4rem'}
                  color={addressFailed ? 'white' : '#4F4F4F'}
                >
                  <Flex alignItems={'center'} gap={'.5rem'} flex="1">
                    <MdLocationOn size={'1.2rem'} />
                    <Text fontWeight={500} fontFamily={'heading'}>
                      Address verification
                    </Text>

                    {data?.address?.isFlagged && (
                      <Status ml={'1rem'} minW={'6rem'} name={'Flagged'} />
                    )}
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} px={0}>
                <AddressResult data={data} />
              </AccordionPanel>
            </AccordionItem>
          )}
          {/* <AccordionItem
            bg={'transparent !important'}
            outline={'none'}
            boxShadow={'none'}
            border="1px solid #EAEAEA"
            rounded={'.5rem'}
            overflow={'hidden'}
            mb={'1.5rem'}
            px={'0'}
            paddingInline={'0'}
            padding={'0'}
            paddingInlineEnd={'0'}
          >
            <h2>
              <AccordionButton
                _hover={{
                  bg: 'rgba(245, 166, 35, 0.2)',
                }}
                bg={'rgba(245, 166, 35, 0.2)'}
                px={accordionpadding}
                h={'4rem'}
              >
                <Flex alignItems={'center'} gap={'.5rem'} flex="1">
                  <TbBriefcaseFilled size={'1.2rem'} color={'#4F4F4F'} />
                  <Text
                    fontWeight={500}
                    color={'#4F4F4F'}
                    fontFamily={'heading'}
                  >
                    Employment verification
                  </Text>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <EmploymentResult />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem
            bg={'transparent !important'}
            outline={'none'}
            boxShadow={'none'}
            border="1px solid #EAEAEA"
            rounded={'.5rem'}
            overflow={'hidden'}
            mb={'1.5rem'}
            px={'0'}
            paddingInline={'0'}
            padding={'0'}
            paddingInlineEnd={'0'}
          >
            <h2>
              <AccordionButton
                _hover={{
                  bg: 'rgba(0, 175, 148, 0.2)',
                }}
                bg={'rgba(0, 175, 148, 0.2)'}
                px={accordionpadding}
                h={'4rem'}
              >
                <Flex alignItems={'center'} gap={'.5rem'} flex="1">
                  <FaGraduationCap size={'1.2rem'} color={'#4F4F4F'} />
                  <Text
                    fontWeight={500}
                    color={'#4F4F4F'}
                    fontFamily={'heading'}
                  >
                    Certificate verification
                  </Text>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <CertificateResult />
            </AccordionPanel>
          </AccordionItem> */}
        </Accordion>
      </Stack>
    </Box>
  );
}
