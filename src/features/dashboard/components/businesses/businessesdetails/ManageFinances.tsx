/* eslint-disable no-unsafe-optional-chaining */
import CustomInput from '@/components/input/CustomInput';
import { useGetAllSystemServicesApi } from '@/features/dashboard/api/business/get-all-services';
import { useGetBusinessesServicesApi } from '@/features/dashboard/api/business/get-business-service';
import { useUpsertBusinessServicesApi } from '@/features/dashboard/api/business/upsert-business-service';
import {
  Box,
  Button,
  Divider,
  GridItem,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function ManageFinances({ onClose }) {
  const { id } = useParams();
  const { data } = useGetBusinessesServicesApi(id as string);
  const [newService, setNewServices] = useState<any>([]);
  const { refetch } = useGetBusinessesServicesApi(id as string, {
    enabled: Boolean(id),
  });
  const { data: ASapi } = useGetAllSystemServicesApi();
  const { mutateAsync, isLoading } = useUpsertBusinessServicesApi();
  const [form, setForm] = useState<Array<any>>(
    data?.data?.map((item) => ({
      price: item.price,
      service: item._id,
    }))
  );
  // console.log('data', data);
  // console.log('all services is', ASapi);

  useEffect(() => {
    if (data?.data && ASapi?.data) {
      const newArr = ASapi?.data.filter(
        (item: any) =>
          !data?.data?.find(
            (es) =>
              String(es.name).toLowerCase() === String(item?.name).toLowerCase()
          )
      );
      setNewServices(newArr);
      // console.log('NEW ARRAY IS ', newArr);
    }
  }, [ASapi, data]);

  const allServices = [...data?.data, ...newService];
  // console.log('all services is ', allServices);
  const submitForm = async () => {
    const newForm = form.map((item) => {
      if (item.price === 0) {
        if (data?.data?.find((s) => s._id === item.service)) {
          const originalService = allServices.find(
            (ali) => ali._id === item.service
          );
          return {
            price: originalService.price,
            service: originalService?._id,
          };
        }
      } else {
        return item;
      }
    });
    const finalForm = newForm.filter((element) => element !== undefined);

    await mutateAsync({
      services: finalForm,
      business: id as string,
    });
    await refetch();
    onClose();
  };

  return (
    <Box pb={'1rem'}>
      <SimpleGrid columns={5} gap={5}>
        {allServices?.map((item) => {
          return (
            <Fragment key={item.name}>
              <GridItem colSpan={3}>
                <CustomInput
                  inputProps={{
                    name: item.slug,
                    value: item.price,
                    isDisabled: true,
                  }}
                  formControlProps={{
                    label: item.name,
                  }}
                />
              </GridItem>
              <GridItem colSpan={2}>
                <CustomInput
                  inputProps={{
                    name: item.slug,
                    type: 'number',
                    onChange: (e) => {
                      const newArr = form.filter((data) => {
                        return data.service !== item._id;
                      });
                      setForm([
                        ...newArr,
                        { price: Number(e.target.value), service: item._id },
                      ]);
                    },
                  }}
                  formControlProps={{
                    label: 'New Amount',
                  }}
                />
              </GridItem>
            </Fragment>
          );
        })}
      </SimpleGrid>

      <Divider borderColor={'#EFF4FD'} />

      <HStack justifyContent={'flex-end'} w={'full'} pt={'2rem'}>
        <Button
          bg={'transparent'}
          color={'#4F4F4F'}
          border={'1px'}
          borderColor={'#4F4F4F'}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button isLoading={isLoading} onClick={submitForm}>
          Save changes
        </Button>
      </HStack>
    </Box>
  );
}
