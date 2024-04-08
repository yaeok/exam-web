'use client'
import React from 'react'

import { Button, HStack, Input, Text, VStack } from '@/design'
import { User } from '@/domain/entity/user_entity'
import { IUserRepository } from '@/infrastructure/repository/user_repository'
import { SearchUserByEmailUseCase } from '@/use_case/user/search_user_by_email_use_case'

export default function SearchView() {
  const [searchWord, setSearchWord] = React.useState<string>('')
  const [userState, setUserState] = React.useState<User | null>(null)
  const onClickSearchBtn = async (word: string) => {
    const userRepository = new IUserRepository()
    const user = await new SearchUserByEmailUseCase(userRepository).execute({
      email: word,
    })
    setUserState(user.user)
  }
  return (
    <div>
      <VStack paddingY='12px'>
        <Text color='gray' fontSize='12px'>
          共有したいユーザのメールアドレスを入力してください
        </Text>
        <HStack width='100%'>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchWord(e.target.value)
            }
          />
          <Button onClick={() => onClickSearchBtn(searchWord)}>検索</Button>
        </HStack>
        {userState === null ? (
          <Text paddingTop='12px' color='gray' fontSize='16px'>
            検索結果がありません
          </Text>
        ) : (
          <div key={userState!.uid}>
            <Text>{userState!.email}</Text>
          </div>
        )}
      </VStack>
    </div>
  )
}
