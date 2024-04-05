import {
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth'

import { AuthRepository } from '@/domain/auth/repository/auth_repository'
import { auth } from '@/infrastructure/firestore/config'

/** firebaseのエラー */
type FirebaseError = {
  code: string
  message: string
  name: string
}

const isFirebaseError = (e: Error): e is FirebaseError => {
  return 'code' in e && 'message' in e
}

export class IAuthRepository implements AuthRepository {
  async signInWithEmail(args: {
    email: string
    password: string
  }): Promise<boolean> {
    const { email, password } = args
    const userCredential: UserCredential = await new Promise<UserCredential>(
      (resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
          .then((response: UserCredential) => {
            resolve(response)
          })
          .catch((error) => {
            switch (error.code) {
              case 'auth/user-not-found':
                return 'ユーザーが見つかりません'
              case 'auth/wrong-password':
                return 'パスワードが間違っています'
              default:
                return 'エラーが発生しました'
            }
          })
      }
    )
    if (userCredential.user.emailVerified) {
      return true
    } else {
      return false
    }
  }

  async signOut(): Promise<boolean> {
    signOut(auth)
      .then(() => {
        return true
      })
      .catch((error) => {
        throw new Error('エラーが発生しました' + error)
      })
    return false
  }
}
