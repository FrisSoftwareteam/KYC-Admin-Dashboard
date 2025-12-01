import { Logo } from '@/components/Logo/Logo';
import {
  Box,
  Divider,
  Flex,
  FlexProps,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconType } from 'react-icons';
import { LuLayoutDashboard } from 'react-icons/lu';
import { PiUsersDuotone } from 'react-icons/pi';
// import { AiOutlineTransaction } from 'react-icons/ai';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoMdBusiness } from 'react-icons/io';
import { FaUserGroup } from 'react-icons/fa6';
import { IoMdLocate } from 'react-icons/io';
import { BsMotherboardFill } from 'react-icons/bs';
interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  path: string;
  slug: string;
}

const NavItem = ({ path, icon, slug, children, ...rest }: NavItemProps) => {
  const { pathname } = useLocation();
  const finalPathname = pathname === '/' ? '/dashboard' : pathname;
  const isActivePath = finalPathname.includes(slug);

  return (
    <Link to={path || '/'}>
      <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          py={'0rem'}
          role="group"
          cursor="pointer"
          bg={'transparent'}
          color={isActivePath ? '#213F6B' : '#565656'}
          fontWeight={isActivePath ? 500 : 400}
          fontSize={isActivePath ? '1rem' : '.9rem'}
          pl={isActivePath ? '1.3rem' : '1.5rem'}
          borderLeft={isActivePath ? '3px solid #213F6B' : 'none'}
          {...rest}
        >
          {icon && (
            <Icon
              mr=".8rem"
              fontSize={isActivePath ? '1.3rem' : '.9rem'}
              fontWeight={isActivePath ? 500 : 400}
              _groupHover={{
                color: 'primary.500',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>{' '}
    </Link>
  );
};

export default function SideBar() {
  return (
    <Stack bg={'white'} minH={'100vh'}>
      <Box pl={'1.5rem'} py={'1rem'}>
        <Logo to="/" w={'7rem'} />
      </Box>
      <Divider borderColor={'#F1F1F1'} />
      <Box pt={'1.5rem'}>
        <Text
          color={'#ADADAD'}
          fontSize={'.6rem'}
          textTransform={'uppercase'}
          fontWeight={500}
          pl={'1.5rem'}
        >
          Overview
        </Text>
        <Box mt={'1rem'}>
          <NavItem path="/" icon={LuLayoutDashboard} slug="dashboard">
            Dashboard
          </NavItem>
        </Box>
      </Box>
      <Box pt={'1.5rem'}>
        <Text
          color={'#ADADAD'}
          fontSize={'.6rem'}
          textTransform={'uppercase'}
          fontWeight={500}
          pl={'1.5rem'}
          mb={'.7rem'}
        >
          Data
        </Text>
        <Stack spacing={'1rem'}>
          {/* <NavItem path="/candidates" icon={PiUsersDuotone} slug="candidates">
            Candidates
          </NavItem> */}
          <NavItem
            path="/verifications"
            icon={MdOutlineVerifiedUser}
            slug="verifications"
          >
            Verifications
          </NavItem>
          <NavItem path="/addresses" icon={IoMdLocate} slug="addresses">
            Addresses
          </NavItem>
          <NavItem path="/modules" icon={BsMotherboardFill} slug="modules">
            Other Modules
          </NavItem>
          <NavItem path="/business" icon={IoMdBusiness} slug="business">
            Businesses
          </NavItem>
          <NavItem path="/partner" icon={FaUserGroup} slug="partner">
            Partners
          </NavItem>
          <NavItem path="/candidates" icon={PiUsersDuotone} slug="candidates">
            Candidates
          </NavItem>
          {/* <NavItem path="/users" icon={PiUsersDuotone} slug="users">
            Users
          </NavItem> */}
          {/* <NavItem
            path="/transactions"
            icon={AiOutlineTransaction}
            slug="transactions"
          >
            Transactions
          </NavItem> */}
          <NavItem path="/settings" icon={IoSettingsOutline} slug="settings">
            Settings
          </NavItem>
        </Stack>
      </Box>
    </Stack>
  );
}
