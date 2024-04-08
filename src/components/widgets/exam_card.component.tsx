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
    router.push('/home/search')
  }
  return (
    <Card>
      <CardHeader>
        <HStack width='100%' justifyContent='space-between'>
          <Heading fontStyle='oblique' fontSize='18'>
            {props.title}
          </Heading>
          <Button colorScheme='red' onClick={() => onClickDelBtn(props.eid)}>
            削除
          </Button>
        </HStack>
      </CardHeader>
      <CardBody>
        <Text color='gray' fontSize='14px'>
          {props.description}
        </Text>
      </CardBody>
      <CardFooter>
        <HStack width='100%' justifyContent='space-between'>
          <Text color='gray' fontSize='12px'>
            作成日時: 2021/09/01
          </Text>
          <Button colorScheme='blue' onClick={() => onClickShareBtn()}>
            共有
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  )
}
