import { IAuthRepository } from '@/infrastructure/repository/auth_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface SignOutUseCaseInput extends UseCaseInput {}

interface SignOutCaseOutput extends UseCaseOutput {
  result: boolean
}

export class SignOutUseCase
  implements UseCase<SignOutUseCaseInput, Promise<SignOutCaseOutput>>
{
  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository
  }

  private authRepository: IAuthRepository

  async execute(): Promise<SignOutCaseOutput> {
    const result = await this.authRepository.signOut()
    return { result }
  }
}
