import { User } from '@/domain/entity/user_entity'

export interface UserRepository {
  getUserById(args: { uid: string }): Promise<User | null>
  createUser(args: { user: User }): Promise<User>
  updateUser(args: { user: User }): Promise<User>
  deleteUser(args: { id: string }): Promise<boolean>
  serachUserByEmail(args: { email: string }): Promise<User | null>
}
