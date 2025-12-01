import {
  Box,
  Button,
  Flex,
  GridItem,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

import mastercardimage from '@/assets/images/settings/mastercard.png';
import visacardimage from '@/assets/images/settings/visa.png';
import { useGetAllCardsApi } from '@/features/dashboard/api/users/get-all-cards';
import { LogoLoader } from '@/components/elements/loader/Loader';
import { useCreatePaymentApi } from '@/features/dashboard/api/create-payment';
import { useRecoilValue } from 'recoil';
import { UserState } from '@/features/auth/store';
import { useToast } from '@/hooks/useToast';
export default function Payments() {
  const { data: GCapi, isLoading: GCloading } = useGetAllCardsApi();
  const { mutateAsync: CPapi, isLoading: CPloading } = useCreatePaymentApi();
  const { businessId, id } = useRecoilValue(UserState);
  const toast = useToast();
  const addCard = async () => {
    if (!businessId || !id) {
      toast({ description: 'No business/user present', status: 'error' });
      return;
    }
    await CPapi({
      businessId,
      userId: id,
      amount: 100,
      allowedChannel: 'card',
    });
  };

  return (
    <div>
      <Box
        px={'1.5rem'}
        pt={'2.3rem'}
        minH={'80vh'}
        bg={'white'}
        rounded={'.4rem'}
        pb={'4rem'}
      >
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Text
            color={'#4F4F4F'}
            fontSize={'1.1rem'}
            fontWeight={500}
            fontFamily={'heading'}
          >
            Payment information
          </Text>

          <Button
            onClick={addCard}
            fontFamily={'heading'}
            fontWeight={500}
            minW={'10rem'}
            minH={'2.5rem'}
            isLoading={CPloading}
          >
            + Add a new card
          </Button>
        </Flex>
        {GCloading ? (
          <LogoLoader h={'40rem'} w={'100%'} />
        ) : (
          <SimpleGrid mt={'1.65rem'} gap={'1.5rem'} columns={3}>
            {GCapi?.data?.map((item) => {
              const isMaster = item.cardType?.trim() === 'mastercard';
              const isVisa = item.cardType?.trim() === 'visa';

              return (
                <GridItem key={item._id}>
                  <Box
                    pt={'1rem'}
                    pl={'1.8rem'}
                    overflow={'hidden'}
                    rounded={'.6rem'}
                    h={'11rem'}
                    position={'relative'}
                    bg={isMaster ? '#FFF0D2' : isVisa ? '#EAF0FF' : ''}
                  >
                    {/* {item.default && (
                      <Center
                        position={'absolute'}
                        right={0}
                        height={'1.8rem'}
                        color={'#5341C5'}
                        fontWeight={500}
                        fontSize={'.7rem'}
                        w={'5rem'}
                        ml={'auto'}
                        bg={'#F2F2F2'}
                        borderTopLeftRadius={'1rem'}
                        borderBottomLeftRadius={'1rem'}
                      >
                        Default
                      </Center>
                    )} */}
                    <Text mt={'3rem'}>{`*****${item.lastFourDigit}`}</Text>

                    <Text
                      fontFamily={'heading'}
                      fontWeight={400}
                      fontSize={'.8rem'}
                      mt={'2rem'}
                    >
                      Expires
                    </Text>
                    <Text fontFamily={'heading'} fontWeight={500}>
                      {`${item.expiryMonth}/${item.expiryYear}`}
                    </Text>
                    <Box
                      position={'absolute'}
                      bottom={isMaster ? 0 : isVisa ? '1rem' : ''}
                      right={isMaster ? 0 : isVisa ? '.8rem' : ''}
                    >
                      <Image
                        h={'100%'}
                        w={'100%'}
                        src={
                          isMaster
                            ? mastercardimage
                            : isVisa
                              ? visacardimage
                              : ''
                        }
                        alt="card-logo"
                      />
                    </Box>
                  </Box>
                </GridItem>
              );
            })}
          </SimpleGrid>
        )}
      </Box>
    </div>
  );
}
