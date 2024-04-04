import { AuthRepository } from '@/infrastructure/repository/auth_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface SignInWithEmailUseCaseInput extends UseCaseInput {
  email: string
  password: string
}

interface SignInWithEmailCaseOutput extends UseCaseOutput {
  result: boolean
}

export class SignInWithEmailUseCase
  implements
    UseCase<SignInWithEmailUseCaseInput, Promise<SignInWithEmailCaseOutput>>
{
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  private authRepository: AuthRepository

  async execute(
    input: SignInWithEmailUseCaseInput
  ): Promise<SignInWithEmailCaseOutput> {
    const result = await this.authRepository.signInWithEmail({
      email: input.email,
      password: input.password,
    })
    return { result }
  }
}
