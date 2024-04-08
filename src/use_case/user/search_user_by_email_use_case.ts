import { User } from '@/domain/entity/user_entity'
import { IUserRepository } from '@/infrastructure/repository/user_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface SearchUserByEmailUseCaseInput extends UseCaseInput {
  email: string
}

interface SearchUserByEmailUseCaseOutput extends UseCaseOutput {
  user: User | null
}

export class SearchUserByEmailUseCase
  implements
    UseCase<
      SearchUserByEmailUseCaseInput,
      Promise<SearchUserByEmailUseCaseOutput>
    >
{
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  private userRepository: IUserRepository

  async execute(
    input: SearchUserByEmailUseCaseInput
  ): Promise<SearchUserByEmailUseCaseOutput> {
    const user = await this.userRepository.serachUserByEmail({
      email: input.email,
    })
    return { user }
  }
}
