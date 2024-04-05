export interface AuthRepository {
  signInWithEmail(args: { email: string; password: string }): Promise<boolean>
  signOut(): Promise<boolean>
}
