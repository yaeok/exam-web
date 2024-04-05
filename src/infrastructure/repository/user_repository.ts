import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'

import { User } from '@/domain/user/entity/user_entity'
import { UserRepository } from '@/domain/user/repository/user_repository'
import { UserDTO } from '@/infrastructure/dto/user/user_dto'
import { db } from '@/infrastructure/firestore/config'

export class IUserRepository implements UserRepository {
  async getUserById(args: { uid: string }) {
    const docRef = doc(db, 'users', args.uid)
    return new Promise<User>((resolve, reject) => {
      const unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.data()
            const user = UserDTO.fromDoc(userData)
            resolve(user)
          }
        },
        (error) => {
          reject(error)
        }
      )
      // 監視の解除を行う関数を返す
      return () => {
        unsubscribe()
      }
    })
  }

  async createUser(args: { user: User }) {
    const colRef = collection(db, 'users')
    const user = UserDTO.fromEntity(args.user).toData()
    await addDoc(colRef, { user })
    return args.user
  }

  async updateUser(args: { user: User }) {
    const docRef = doc(db, 'users', args.user.uid)
    const user = UserDTO.fromEntity(args.user).toData()
    return new Promise<User>((resolve, reject) => {
      updateDoc(docRef, user)
        .then(() => {
          resolve(args.user)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  async deleteUser(args: { id: string }) {
    const docRef = doc(db, 'users', args.id)
    return new Promise<boolean>((resolve, reject) => {
      updateDoc(docRef, {
        deletedAt: new Date(),
      })
        .then(() => {
          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
