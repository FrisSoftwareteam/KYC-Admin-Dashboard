import { Box, GridItem, SimpleGrid } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import SideBar from './SideBar';
import TopNav from './TopNav';
import { useAbly } from '@/lib/ably/ably';
import { NotificationModal } from './NotificationModal';

export default function Layout({ children }: { children: ReactNode }) {
  const sidebarwidth = '13rem';
  const { message, handleClose } = useAbly();

  return (
    <Box bg={'#F1F1F6'} overflowX={'hidden'}>
      <SimpleGrid
        columnGap={'1px'}
        templateColumns={`${sidebarwidth} auto`}
        columns={2}
      >
        <GridItem>
          <Box width={sidebarwidth} position={'fixed'} zIndex={2}>
            <SideBar />
          </Box>
        </GridItem>
        <GridItem>
          <Box
            pl={sidebarwidth}
            zIndex={1}
            position={'fixed'}
            w={'100%'}
            top={0}
            left={0}
          >
            <TopNav />
          </Box>
          <Box pt={'5rem'} w={'100%'}>
            {children}
          </Box>
        </GridItem>
      </SimpleGrid>

      <NotificationModal
        isOpen={message?.open}
        onClose={handleClose}
        data={message?.data}
      />
    </Box>
  );
}
