import React from 'react';
import {
  Container,
  Box,
  Stack,
  Text,
  Link,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Heading,
  BoxProps,
} from '@chakra-ui/react';

const SOCIAL_LINKS = [
  {
    label: 'Discord Community',
    href: 'DISCORD_INVITE_LINK',
  },
  {
    label: 'GitHub Repository',
    href: 'GITHUB_LINK',
  },
  {
    label: 'Twitter Account',
    href: 'TWITTER_LINK',
  },
];

export const Footer = (props: BoxProps) => {
  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      color={useColorModeValue('gray.600', 'gray.500')}
      py={{ base: 4, sm: 8 }}
      {...props}
    >
      <Container maxW={'7xl'}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} mb={6} spacing={6}>
          <Flex justify={'center'} align={'center'}>
            <Link href={'/'} passHref>
              <Heading
                mt='6'
                mb={6}
                textAlign='center'
                size='3xl'
                fontWeight='bold'
                bgClip='text'
                bgGradient='linear(to-l, #7928CA, #FF0080)'
              >
                Gardeniox
              </Heading>
            </Link>
          </Flex>
          <Stack spacing={4}>
            <Text fontFamily={'heading'} fontSize={'lg'} fontWeight='bold'>
              Social
            </Text>
            <Stack align={'start'}>
              {SOCIAL_LINKS.map((link) => (
                <Link href={link.href}>{link.label}</Link>
              ))}
            </Stack>
          </Stack>
          <Stack spacing={4}>
            <Text fontFamily={'heading'} fontSize={'lg'} fontWeight='bold'>
              Social
            </Text>
            <Stack align={'start'}>
              {SOCIAL_LINKS.map((link) => (
                <Link href={link.href}>{link.label}</Link>
              ))}
            </Stack>
          </Stack>
        </SimpleGrid>

        <Stack
          textAlign={'center'}
          borderTopWidth={1}
          borderTopStyle={'solid'}
          borderTopColor={useColorModeValue('gray.300', 'gray.800')}
          pt={8}
        >
          <Text>
            Made with ❤️ on 🇦🇷 by <Link href=''>Faustino Zanetto</Link>
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};