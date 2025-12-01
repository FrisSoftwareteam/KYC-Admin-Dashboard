import CustomSelect from '@/components/input/CustomSelect';
import { useDispatchAddressApi } from '@/features/dashboard/api/address/dispatch-task';
import { useGetAllAgentsApi } from '@/features/dashboard/api/address/get-agents';
import { useGetAllPartnersApi } from '@/features/dashboard/api/address/get-all-partners';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import { BsX } from 'react-icons/bs';

import { useParams } from 'react-router-dom';

export function ReassignAgent({ isOpen, onClose }) {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [selectedPartner, setSelectedPartner] = useState('');
  const [selectedAgents, setSelectedAgents] = useState<any>([]);
  const { mutateAsync: DAapi, isLoading: DAloading } = useDispatchAddressApi();
  const { data: GAPapi } = useGetAllPartnersApi(id as string, {
    enabled: Boolean(id),
  });
  const { data: GAapi } = useGetAllAgentsApi(
    selectedPartner as string,
    id as string,
    { enabled: Boolean(selectedPartner) && Boolean(id) }
  );

  const checkAgent = (e, item) => {
    const isChecked = e.target.checked;
    const id = item?.agent?.id;
    if (isChecked) {
      setSelectedAgents((prev) => [...prev, id]);
    } else {
      const newArr = selectedAgents?.filter((item) => item !== id);
      setSelectedAgents(newArr);
    }
  };

  const dispatch = async () => {
    await DAapi({
      address: id,
      partner: selectedPartner,
      agents: selectedAgents,
    });
    await queryClient.invalidateQueries({
      queryKey: ['get-address-by-id', id],
    });
  };

  return (
    <Fragment>
      <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
        <ModalOverlay />
        <ModalContent>
          <HStack
            w={'full'}
            justifyContent={'space-between'}
            h={'80px'}
            px={'24px'}
            borderBottom={'1px'}
            borderColor={'#F5F7FA'}
          >
            <HStack>
              <BsX cursor={'pointer'} onClick={onClose} fontSize={'20px'} />
              <Text fontWeight={500} fontSize={'20px'}>
                Assign Agents
              </Text>
            </HStack>
            <Button
              variant={'ghost'}
              borderColor={'#4F4F4F'}
              borderWidth={'1px'}
              color={'#4F4F4F'}
              fontSize={'13px'}
              fontWeight={500}
              _hover={{ bg: 'transparent' }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </HStack>
          <Flex>
            <Box mx={'96px'} mt={'32px'} w={'526px'}>
              <CustomSelect
                label="Select Partner"
                placeholder="Type  search..."
                options={
                  GAPapi?.data?.map((item) => ({
                    label: item.name,
                    value: item._id,
                  })) || []
                }
                onChange={(val) => {
                  setSelectedPartner(val.value);
                }}
              />

              {GAapi?.data && (
                <Flex justifyContent={'space-between'} mt={'1rem'}>
                  <Text>Select All</Text>
                  <Checkbox
                    isChecked={selectedAgents.length === GAapi?.data.length}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      if (isChecked) {
                        setSelectedAgents(
                          GAapi?.data?.map((item) => item.agent.id)
                        );
                      } else {
                        setSelectedAgents([]);
                      }
                    }}
                  />
                </Flex>
              )}
              <VStack w={'full'} mt={'32px'}>
                {GAapi?.data?.map((item) => (
                  <Box w={'full'} key={item.agent.id}>
                    <HStack
                      justifyContent={'space-between'}
                      alignItems={'flex-start'}
                      h={'65px'}
                      w={'full'}
                    >
                      <HStack alignItems={'flex-start'}>
                        <Avatar
                          name="Dan Abrahmov"
                          src={item?.agent?.imageUrl}
                          h={'32px'}
                          w={'32px'}
                        />
                        <Box>
                          <HStack>
                            <Text
                              fontWeight={500}
                              fontSize={'14px'}
                              color={'#181819E5'}
                              textTransform={'capitalize'}
                            >
                              {item?.agent?.user?.firstName?.toLowerCase()}{' '}
                              {item?.agent?.user?.lastName?.toLowerCase()}
                            </Text>
                            <Box
                              h={'10px'}
                              w={'10px'}
                              bg={
                                item?.presence === 'online'
                                  ? '#56C568'
                                  : '#DBDBDB'
                              }
                              borderRadius={'full'}
                            />
                          </HStack>
                          <Box
                            bg={'#DBDBDB'}
                            borderRadius={'2px'}
                            w={'fit-content'}
                            my={'4px'}
                            px={'2'}
                          >
                            <Text
                              fontWeight={500}
                              fontSize={'8.35px'}
                              color={'#4F4F4F'}
                            >
                              {item.distance} meters away
                            </Text>
                          </Box>
                        </Box>
                      </HStack>
                      <Checkbox
                        isChecked={selectedAgents?.includes(item.agent.id)}
                        onChange={(e) => checkAgent(e, item)}
                      />
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Box>
            <Box mt={'4rem'}>
              <Button
                isDisabled={selectedAgents.length === 0}
                isLoading={DAloading}
                onClick={dispatch}
              >
                Dispatch
              </Button>
            </Box>
          </Flex>
          <Box mt={'44px'} mx={'96px'}></Box>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
