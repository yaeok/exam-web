export interface IAuthRepository {
  signInWithEmail(args: { email: string; password: string }): Promise<boolean>
  signOut(): Promise<boolean>
}
