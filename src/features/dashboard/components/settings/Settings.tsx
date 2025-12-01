import {
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  TabPanels,
  TabPanel,
  Box,
} from '@chakra-ui/react';
import General from './general/General';
import Users from './users/Users';
import Service from './services/Service';

export function Settings() {
  const CustomTab = ({ name }) => {
    return (
      <Tab
        _selected={{ color: '#11406F', fontWeight: 500 }}
        color={'#7C7C7C'}
        fontWeight={400}
        fontSize={'.8rem'}
        fontFamily={'heading'}
      >
        {name}
      </Tab>
    );
  };
  return (
    <Box m={'1.5rem'}>
      <Tabs position="relative" variant="unstyled">
        <TabList pl={'3rem'}>
          <CustomTab name={'General'} />
          {/* <CustomTab name={'Business'} /> */}
          {/* <CustomTab name="Payment" /> */}
          <CustomTab name="Users" />
          <CustomTab name="Services" />
        </TabList>
        <TabIndicator height="3px" bg="#11406F" />
        <TabPanels mt={'-.81rem'}>
          <TabPanel>
            <General />
          </TabPanel>
          {/* <TabPanel>
            <Business />
          </TabPanel> */}
          {/* <TabPanel>
            <Payments />
          </TabPanel> */}
          <TabPanel>
            <Users />
          </TabPanel>
          <TabPanel>
            <Service />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
