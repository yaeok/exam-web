import { User } from '@/domain/entity/user_entity'
import { UserDTO } from '@/infrastructure/dto/user/user_dto'

export class UserMapper {
  static toDomain(user: UserDTO): User {
    return new User({
      uid: user.uid,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    })
  }
}
