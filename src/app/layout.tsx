import { ChakraProvider } from '@/design'
import { AuthContextProvider } from '@/providers/auth_context'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'exam-web-app',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body>
        <ChakraProvider cssVarsRoot={undefined}>
          <AuthContextProvider>{children}</AuthContextProvider>
        </ChakraProvider>
      </body>
    </html>
  )
}
