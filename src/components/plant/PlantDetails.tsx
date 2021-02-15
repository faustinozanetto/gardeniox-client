import React from 'react';
import {
  Flex,
  useColorModeValue,
  Stack,
  Box,
  Heading,
  Image,
  Text,
  VStack,
  StackDivider,
  SimpleGrid,
} from '@chakra-ui/react';
import { PlantDisease } from './PlantDisease';
import { PlantQuery, usePlantDiseasesQuery } from '../../generated/graphql';
import { PlantRequirement } from './details/PlantRequirement';
import { GrowsOn } from './details/GrowsOn';

interface PlantDetailsProps {
  plantData?: PlantQuery;
}

export const PlantDetails: React.FC<PlantDetailsProps> = ({ plantData }) => {
  const { data: diseasesData, error, loading } = usePlantDiseasesQuery({
    variables: {
      id: plantData?.plant.id!,
    },
  });
  return (
    <Flex
      justifyContent='center'
      alignContent='center'
      bgColor={useColorModeValue('gray.50', 'gray.900')}
      borderRadius='3xl'
      boxShadow='2xl'
    >
      <VStack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 4, md: 8 }}
        py={{ base: 10, md: 16 }}
      >
        <Box>
          <Image
            borderRadius='full'
            boxSize={{ base: '175px', md: '250px', xl: '350px' }}
            src={plantData?.plant.image}
          />
        </Box>
        <Box>
          <Stack>
            <Box>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
              >
                <Text as={'span'} position={'relative'}>
                  {loading ? 'Loading...' : plantData?.plant.name}
                </Text>
              </Heading>
            </Box>
            <Box>
              <Heading
                lineHeight={1.1}
                fontWeight={300}
                fontSize={{ base: '1xl', sm: '2xl', lg: '3xl' }}
              >
                <Text as={'span'} position={'relative'}>
                  {loading ? 'Loading...' : plantData?.plant.scientificName}
                </Text>
              </Heading>
            </Box>
          </Stack>
        </Box>
        <Flex display={{ base: 'none', md: 'none', lg: 'flex', xl: 'flex' }}>
          <Stack p={4} divider={<StackDivider borderColor='gray.200' />}>
            <Box d='flex'>
              <VStack w='50%' p={2}>
                <Heading>Diseases</Heading>
                <Box as={Stack}>
                  {diseasesData?.plantDiseases.map((disease, index) => (
                    <PlantDisease key={index} diseaseData={disease} />
                  ))}
                </Box>
              </VStack>
              <VStack w='50%' p={2}>
                <Heading>Information</Heading>
                <SimpleGrid columns={{ smd: 2, md: 2 }} spacing={4}>
                  <PlantRequirement type='water' amount={3} />
                  <PlantRequirement type='soil' amount={3} />
                  <PlantRequirement type='sun' amount={3} />
                  <GrowsOn />
                </SimpleGrid>
              </VStack>
            </Box>
          </Stack>
        </Flex>
        <Flex display={{ base: 'flex', md: 'flex', lg: 'none', xl: 'none' }}>
          <VStack p={4} align='stretch'>
            <Box>
              <VStack p={2}>
                <Heading>Diseases</Heading>
                <Box as={Stack}>
                  {diseasesData?.plantDiseases.map((disease, index) => (
                    <PlantDisease key={index} diseaseData={disease} />
                  ))}
                </Box>
              </VStack>
              <VStack p={2}>
                <Heading>Information</Heading>
                <SimpleGrid
                  columns={{ base: 1, xs: 2, smd: 2, md: 2 }}
                  spacing={4}
                >
                  <PlantRequirement type='water' amount={3} />
                  <PlantRequirement type='soil' amount={3} />
                  <PlantRequirement type='sun' amount={3} />
                  <GrowsOn />
                </SimpleGrid>
              </VStack>
            </Box>
          </VStack>
        </Flex>
      </VStack>
    </Flex>
  );
};