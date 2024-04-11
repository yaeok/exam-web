'use client'
import { useRouter } from 'next/navigation'

import { Box, Button, Flex, Heading, useToast } from '@/design'
import { auth } from '@/infrastructure/firestore/config'

export default function Header() {
  const router = useRouter()
  const toast = useToast()
  const onClickLogout = () => {}
  return (
    <Box as='header' position='sticky' top='0' zIndex='docked'>
      <Flex
        bg='blackAlpha.800'
        color='gray.600'
        minH='60px'
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle='solid'
        borderColor='gray.200'
        align='center'
      >
        <Flex
          flex={1}
          justify='space-between'
          maxW='container.lg'
          mx='auto'
          alignItems='center'
        >
          <Heading
            as='h1'
            size={{ base: 'md', md: 'lg' }}
            color='whiteAlpha.900'
          >
            自己学習アプリ
          </Heading>
          {auth.currentUser === null ? null : (
            <Button
              bg='red.500'
              color='white'
              _hover={{ bg: 'red.400' }}
              onClick={() => onClickLogout()}
            >
              ログアウト
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
