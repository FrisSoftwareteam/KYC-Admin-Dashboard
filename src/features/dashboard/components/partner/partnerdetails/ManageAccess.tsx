import {
  Box,
  Grid,
  GridItem,
  Text,
  Checkbox,
  Button,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { useManageAccessHook } from '@/features/dashboard/hooks/useManagePartnerAccess';

export default function ManageAccess({ onClose }: { onClose: () => void }) {
  const { handleSubmit, permissionsData } = useManageAccessHook({ onClose });

  return (
    <Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem colSpan={2}>
          <Text fontSize="lg" fontWeight="bold">
            List of Access
          </Text>
        </GridItem>
        {permissionsData?.map((item) => (
          <GridItem key={item.id}>
            <Checkbox>{item.name}</Checkbox>
          </GridItem>
        ))}
      </Grid>

      <Flex justifyContent={'flex-end'}>
        <Button mt={6} onClick={handleSubmit}>
          Submit
        </Button>
      </Flex>
    </Box>
  );
}
