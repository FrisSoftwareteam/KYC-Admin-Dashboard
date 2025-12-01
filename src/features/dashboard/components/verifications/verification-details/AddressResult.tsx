import {
  Box,
  Flex,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { MdCalendarMonth } from 'react-icons/md';
import { formatDate } from '@/utils/date-formater';
import { getColor } from '@/utils/get-color';
import { useState } from 'react';
// import MapWithDirection from '@/components/map/MapWithDirection';
import VslMap from '@/components/map/VslMap';
import ImageModal from './ImageModal';
export default function AddressResult({ data }: any) {
  const accordionpadding = '2.5rem';
  const comment: Array<string> = data?.address?.notes || [];
  const images = data?.address?.images;
  const [showMap, setShowMap] = useState(false);

  return (
    <Box>
      <Flex
        flexWrap={'wrap'}
        bg={'white'}
        justifyContent={'space-between'}
        alignItems={'center'}
        borderBottom="1px solid #EAEAEA"
        h={'4rem'}
        px={accordionpadding}
      >
        <Flex
          flexWrap={'wrap'}
          color={'#828282'}
          alignItems={'center'}
          gap={'2rem'}
        >
          <Flex gap={'.5rem'} alignItems={'center'}>
            <IoCheckmarkCircleSharp
              fontSize={'1.3rem'}
              color={getColor(data?.address?.status)}
            />
            <Text fontFamily={'heading'} fontSize={'.8rem'}>
              {data?.address?.formatAddress}
            </Text>
            {data?.address?.submissionLocation?.latitude && (
              <Text
                onClick={() => {
                  setShowMap((prev) => !prev);
                }}
                cursor={'pointer'}
                color={'#5B8BFF'}
                fontFamily={'heading'}
                fontSize={'.8rem'}
              >
                {showMap ? 'Hide address map view' : 'View address on map'}
              </Text>
            )}
          </Flex>
        </Flex>

        <Flex alignItems={'center'} gap={'.5rem'}>
          <Text fontFamily={'heading'} fontSize={'.8rem'} color={'#828282'}>
            Accuracy
          </Text>
          <Text fontWeight={500} color={'#4F4F4F'}>
            {data?.address?.accuracy}
          </Text>
        </Flex>

        <Flex gap={'.5rem'} alignItems={'center'} color={'#828282'}>
          <MdCalendarMonth />
          <Text fontFamily={'heading'} fontSize={'.8rem'}>
            {formatDate(data?.createdAt)}
          </Text>
        </Flex>
      </Flex>

      {/* =========================BOTTOM======================== */}
      <Stack
        spacing={'2rem'}
        maxW={'50rem'}
        mt={'1.5rem'}
        mb={'2rem'}
        px={accordionpadding}
      >
        {showMap && data?.address?.submissionLocation?.latitude && (
          <Box>
            <VslMap
              position={{
                lat: Number(data?.address?.position?.latitude),
                lng: Number(data?.address?.position?.longitude),
              }}
              submissionLocation={{
                lat: Number(data?.address?.submissionLocation?.latitude),
                lng: Number(data?.address?.submissionLocation?.longitude),
              }}
            />
          </Box>
        )}
        {comment.length > 0 && (
          <Box>
            <Text
              mb={'.5rem'}
              fontFamily={'heading'}
              fontWeight={500}
              color={'#4F4F4F'}
            >
              Comment by agent
            </Text>
            <UnorderedList>
              {comment
                .filter((item) => Boolean(item))
                .map((item, index) => (
                  <ListItem
                    fontFamily={'heading'}
                    color={'#828282'}
                    key={item + '' + index}
                  >
                    {item}
                  </ListItem>
                ))}
            </UnorderedList>
          </Box>
        )}
        {
          <Box>
            <Text
              mb={'.5rem'}
              fontFamily={'heading'}
              fontWeight={500}
              color={'#4F4F4F'}
            >
              Photos
            </Text>
            <Flex alignItems={'center'} flexWrap={'wrap'} gap={'1.5rem'}>
              {images?.length > 0 ? (
                images?.map((item) => <ImageModal key={item} src={item} />)
              ) : (
                <Text opacity={0.5} fontSize={'.9rem'}>
                  There are no images
                </Text>
              )}
            </Flex>
          </Box>
        }

        {data?.address?.agentReports?.audioUrl && (
          <Box>
            <Text
              mb={'.5rem'}
              fontFamily={'heading'}
              fontWeight={500}
              color={'#4F4F4F'}
            >
              Voice Comment
            </Text>
            <div>
              <audio controls>
                <source
                  src={data?.address?.agentReports?.audioUrl}
                  type="audio/mp3"
                />
                Your browser does not support the audio element.
              </audio>
            </div>
          </Box>
        )}

        {data?.address?.signature && (
          <Box>
            <Text
              mb={'.5rem'}
              fontFamily={'heading'}
              fontWeight={500}
              color={'#4F4F4F'}
            >
              Signature
            </Text>

            <ImageModal src={data?.address?.signature} />
            {/* <Image
                src={data?.address?.signature}
                alt="signature"
                h={'100%'}
                w={'100%'}
                objectFit={'cover'}
              /> */}
          </Box>
        )}
      </Stack>
    </Box>
  );
}
