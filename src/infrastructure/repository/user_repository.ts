import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

import { User } from '@/domain/entity/user_entity'
import { UserRepository } from '@/domain/repository/user_repository'
import { UserDTO } from '@/infrastructure/dto/user/user_dto'
import { db, master } from '@/infrastructure/firestore/config'

export class IUserRepository implements UserRepository {
  async getUserById(args: { uid: string }): Promise<User> {
    const docRef = doc(db, master, 'users', args.uid)
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
    const colRef = collection(db, master, 'users')
    const user = UserDTO.fromEntity(args.user).toData()
    await addDoc(colRef, { user })
    return args.user
  }

  async updateUser(args: { user: User }) {
    const docRef = doc(db, master, 'users', args.user.uid)
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
    const docRef = doc(db, master, 'users', args.id)
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

  serachUserByEmail(args: { email: string }): Promise<User | null> {
    const colRef = collection(db, master, 'users')
    const q = query(colRef, where('email', '==', args.email))
    return new Promise<User | null>((resolve, reject) => {
      getDocs(q)
        .then((snapshot) => {
          if (snapshot.empty) {
            resolve(null)
          } else {
            snapshot.forEach((doc) => {
              const userData = doc.data()
              const user = UserDTO.fromDoc(userData)
              resolve(user)
            })
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
