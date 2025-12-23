import { Box, Link, type LinkProps, Image, type ImageProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import logo from '@/assets/clecheck-logo.png';

type LogoProps = ImageProps & {
  to?: string;
  text?: ReactNode;
  linkProps?: LinkProps;
};

export const Logo = (props: LogoProps) => {
  const { linkProps, to } = props;

  function PlainLogo() {
    return <Image src={logo} aria-label={`logo`} {...props} />;
  }

  function LinkLogo() {
    return (
      <Box
        bg={'black'}
        p={'0.4rem'}
        borderRadius={'0.6rem'}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Link as={ReactLink} to={to} {...linkProps}>
          <PlainLogo />
        </Link>
      </Box>
    );
  }

  if (to) {
    return <LinkLogo />;
  }

  return <PlainLogo />;
};
