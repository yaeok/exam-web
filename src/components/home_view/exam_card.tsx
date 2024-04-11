'use client'
import { useRouter } from 'next/navigation'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  HStack,
  Text,
  VStack,
} from '@/design'

type ExamCardProps = {
  eid: string
  title: string
  description: string
}

export default function ExamCard(props: ExamCardProps) {
  const router = useRouter()
  const onClickDelBtn = (eid: string) => {
    console.log('削除ボタンが押されました' + eid)
  }
  const onClickShareBtn = () => {
    router.push(`/home/${props.eid}`)
  }
  return (
    <Card>
      <CardHeader>
        <HStack width='100%' justifyContent='space-between'>
          <Heading fontStyle='oblique' fontSize='18'>
            {props.title}
          </Heading>
        </HStack>
      </CardHeader>
      <CardBody>
        <VStack>
          <Text color='gray' fontSize='14px'>
            {props.description}
          </Text>
          <Text color='gray' fontSize='12px' textAlign='end'>
            作成日時: 2021/09/01
          </Text>
        </VStack>
      </CardBody>
      <CardFooter>
        <HStack width='100%' justifyContent='space-between'>
          <Button
            bg='blue.200'
            _hover={{ bg: 'blue.300' }}
            color='white'
            onClick={() => onClickShareBtn()}
          >
            共有
          </Button>
          <Button
            bg='red.400'
            _hover={{ bg: 'red.500' }}
            color='white'
            onClick={() => onClickDelBtn(props.eid)}
          >
            削除
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  )
}
