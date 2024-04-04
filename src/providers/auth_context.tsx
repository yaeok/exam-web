'use client'

import { onAuthStateChanged } from 'firebase/auth'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import Loading from '@/components/widgets/loading.component'
import { User } from '@/domain/user/entity/user_entity'
import { auth } from '@/infrastructure/firestore/config'
import { UserRepository } from '@/infrastructure/repository/user_repository'

export const AuthContext = createContext({})

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userRepository = new UserRepository()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        userRepository.getUserById({ uid: user.uid }).then((user) => {
          setCurrentUser(user)
        })
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  )
}
