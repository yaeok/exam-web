import { AuthRepository } from '@/infrastructure/repository/auth_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface SignOutUseCaseInput extends UseCaseInput {}

interface SignOutCaseOutput extends UseCaseOutput {
  result: boolean
}

export class SignOutUseCase
  implements UseCase<SignOutUseCaseInput, Promise<SignOutCaseOutput>>
{
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  private authRepository: AuthRepository

  async execute(): Promise<SignOutCaseOutput> {
    const result = await this.authRepository.signOut()
    return { result }
  }
}
