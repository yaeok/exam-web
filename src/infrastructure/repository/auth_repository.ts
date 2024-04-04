import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

import { IAuthRepository } from '@/domain/auth/repository/auth_repository'
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

export class AuthRepository implements IAuthRepository {
  async signInWithEmail(args: {
    email: string
    password: string
  }): Promise<boolean> {
    const { email, password } = args
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          resolve(true)
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
    })
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
